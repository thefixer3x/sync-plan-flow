// Voice Service for Bella AI Assistant
// Integrates ElevenLabs TTS and OpenAI Whisper STT

export interface VoiceConfig {
  elevenLabsApiKey?: string;
  openaiApiKey?: string;
  voice?: string;
  voiceId?: string;
  model?: string;
}

export interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
}

export interface VoiceResponse {
  success: boolean;
  data?: any;
  error?: string;
}

class VoiceService {
  private config: VoiceConfig = {};
  private isListening = false;
  private isSpeaking = false;
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  
  // Browser Speech Recognition (fallback)
  private recognition: any = null;

  constructor(config: VoiceConfig = {}) {
    this.config = {
      voice: 'Rachel', // ElevenLabs voice
      model: 'whisper-1', // OpenAI model
      ...config
    };
    
    this.initializeBrowserSpeechRecognition();
  }

  private initializeBrowserSpeechRecognition() {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';
      }
    }
  }

  // Text to Speech using ElevenLabs
  async textToSpeech(text: string): Promise<VoiceResponse> {
    try {
      this.isSpeaking = true;
      
      // If ElevenLabs API key is available, use it
      if (this.config.elevenLabsApiKey) {
        return await this.elevenLabsTTS(text);
      }
      
      // Fallback to browser Speech Synthesis
      return await this.browserTTS(text);
      
    } catch (error) {
      console.error('TTS Error:', error);
      this.isSpeaking = false;
      return { success: false, error: error instanceof Error ? error.message : 'TTS failed' };
    }
  }

  private async elevenLabsTTS(text: string): Promise<VoiceResponse> {
    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${this.getVoiceId()}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': this.config.elevenLabsApiKey!
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5
          }
        })
      });

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.status}`);
      }

      const audioBlob = await response.blob();
      await this.playAudio(audioBlob);
      
      this.isSpeaking = false;
      return { success: true, data: { audioBlob } };
      
    } catch (error) {
      this.isSpeaking = false;
      throw error;
    }
  }

  private async browserTTS(text: string): Promise<VoiceResponse> {
    return new Promise((resolve) => {
      if (!window.speechSynthesis) {
        resolve({ success: false, error: 'Speech synthesis not supported' });
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;

      utterance.onend = () => {
        this.isSpeaking = false;
        resolve({ success: true });
      };

      utterance.onerror = (event) => {
        this.isSpeaking = false;
        resolve({ success: false, error: event.error });
      };

      window.speechSynthesis.speak(utterance);
    });
  }

  // Speech to Text using OpenAI Whisper or browser API
  async startListening(onResult: (result: SpeechRecognitionResult) => void): Promise<VoiceResponse> {
    try {
      this.isListening = true;

      // Try to use media recorder for OpenAI Whisper
      if (this.config.openaiApiKey && navigator.mediaDevices) {
        return await this.startWhisperRecording(onResult);
      }

      // Fallback to browser speech recognition
      return await this.startBrowserRecognition(onResult);

    } catch (error) {
      this.isListening = false;
      console.error('STT Error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'STT failed' };
    }
  }

  private async startWhisperRecording(onResult: (result: SpeechRecognitionResult) => void): Promise<VoiceResponse> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        this.audioChunks.push(event.data);
      };

      this.mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
        const transcript = await this.transcribeWithWhisper(audioBlob);
        
        if (transcript) {
          onResult({
            transcript,
            confidence: 0.9, // Whisper doesn't provide confidence scores
            isFinal: true
          });
        }
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      this.mediaRecorder.start();
      return { success: true, data: { method: 'whisper' } };

    } catch (error) {
      throw error;
    }
  }

  private async startBrowserRecognition(onResult: (result: SpeechRecognitionResult) => void): Promise<VoiceResponse> {
    if (!this.recognition) {
      return { success: false, error: 'Speech recognition not supported' };
    }

    this.recognition.onresult = (event: any) => {
      const result = event.results[event.resultIndex];
      onResult({
        transcript: result[0].transcript,
        confidence: result[0].confidence,
        isFinal: result.isFinal
      });
    };

    this.recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      this.isListening = false;
    };

    this.recognition.onend = () => {
      this.isListening = false;
    };

    this.recognition.start();
    return { success: true, data: { method: 'browser' } };
  }

  async stopListening(): Promise<void> {
    this.isListening = false;

    if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
      this.mediaRecorder.stop();
    }

    if (this.recognition) {
      this.recognition.stop();
    }
  }

  private async transcribeWithWhisper(audioBlob: Blob): Promise<string | null> {
    try {
      const formData = new FormData();
      formData.append('file', audioBlob, 'audio.wav');
      formData.append('model', this.config.model!);

      const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.openaiApiKey}`,
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const result = await response.json();
      return result.text || null;

    } catch (error) {
      console.error('Whisper transcription error:', error);
      return null;
    }
  }

  private async playAudio(audioBlob: Blob): Promise<void> {
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      audio.src = audioUrl;
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        resolve();
      };
      audio.onerror = () => {
        URL.revokeObjectURL(audioUrl);
        reject(new Error('Audio playback failed'));
      };
      
      audio.play();
    });
  }

  private getVoiceId(): string {
    const voiceMap: { [key: string]: string } = {
      'Rachel': 'pNInz6obpgDQGcFmaJgB', // ElevenLabs Rachel voice
      'Adam': '2EiwWnXFnvU5JabPnv8n',   // ElevenLabs Adam voice
      'Bella': 'EXAVITQu4vr4xnSDxMaL',  // ElevenLabs Bella voice (perfect for our AI!)
    };
    
    return voiceMap[this.config.voice!] || voiceMap['Rachel'];
  }

  // Getters for component state
  get isCurrentlyListening(): boolean {
    return this.isListening;
  }

  get isCurrentlySpeaking(): boolean {
    return this.isSpeaking;
  }

  // Update configuration
  updateConfig(newConfig: Partial<VoiceConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  // Stop all voice operations
  async stopAll(): Promise<void> {
    await this.stopListening();
    
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    this.isSpeaking = false;
  }
}

export default VoiceService;