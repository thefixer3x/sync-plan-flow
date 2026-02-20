import { useState, useEffect, useRef, useCallback } from 'react';
import VoiceService, { VoiceConfig, SpeechRecognitionResult } from '../services/voiceService';

export interface UseVoiceOptions extends VoiceConfig {
  autoStart?: boolean;
  onTranscript?: (transcript: string, isFinal: boolean) => void;
  onSpeakStart?: () => void;
  onSpeakEnd?: () => void;
  onListenStart?: () => void;
  onListenEnd?: () => void;
  onError?: (error: string) => void;
}

export interface UseVoiceReturn {
  // States
  isListening: boolean;
  isSpeaking: boolean;
  isProcessing: boolean;
  transcript: string;
  error: string | null;
  
  // Actions
  startListening: () => Promise<void>;
  stopListening: () => Promise<void>;
  speak: (text: string) => Promise<void>;
  stopSpeaking: () => Promise<void>;
  toggle: () => Promise<void>;
  reset: () => void;
  
  // Configuration
  updateConfig: (config: Partial<VoiceConfig>) => void;
}

export const useVoice = (options: UseVoiceOptions = {}): UseVoiceReturn => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const voiceServiceRef = useRef<VoiceService | null>(null);
  const {
    autoStart = false,
    onTranscript,
    onSpeakStart,
    onSpeakEnd,
    onListenStart,
    onListenEnd,
    onError,
    ...voiceConfig
  } = options;

  // Initialize voice service
  useEffect(() => {
    voiceServiceRef.current = new VoiceService(voiceConfig);
    
    if (autoStart) {
      startListening();
    }

    return () => {
      if (voiceServiceRef.current) {
        voiceServiceRef.current.stopAll();
      }
    };
  }, []);

  // Handle speech recognition results
  const handleSpeechResult = useCallback((result: SpeechRecognitionResult) => {
    setTranscript(result.transcript);
    onTranscript?.(result.transcript, result.isFinal);
    
    if (result.isFinal) {
      setIsProcessing(false);
    }
  }, [onTranscript]);

  const startListening = useCallback(async () => {
    if (!voiceServiceRef.current || isListening) return;

    try {
      setError(null);
      setTranscript('');
      setIsProcessing(true);
      
      const result = await voiceServiceRef.current.startListening(handleSpeechResult);
      
      if (result.success) {
        setIsListening(true);
        onListenStart?.();
      } else {
        setError(result.error || 'Failed to start listening');
        onError?.(result.error || 'Failed to start listening');
        setIsProcessing(false);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      onError?.(errorMessage);
      setIsProcessing(false);
    }
  }, [isListening, handleSpeechResult, onListenStart, onError]);

  const stopListening = useCallback(async () => {
    if (!voiceServiceRef.current || !isListening) return;

    try {
      await voiceServiceRef.current.stopListening();
      setIsListening(false);
      setIsProcessing(false);
      onListenEnd?.();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to stop listening';
      setError(errorMessage);
      onError?.(errorMessage);
    }
  }, [isListening, onListenEnd, onError]);

  const speak = useCallback(async (text: string) => {
    if (!voiceServiceRef.current || isSpeaking) return;

    try {
      setError(null);
      setIsSpeaking(true);
      onSpeakStart?.();
      
      const result = await voiceServiceRef.current.textToSpeech(text);
      
      if (!result.success) {
        setError(result.error || 'Failed to speak');
        onError?.(result.error || 'Failed to speak');
      }
      
      setIsSpeaking(false);
      onSpeakEnd?.();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Speech failed';
      setError(errorMessage);
      onError?.(errorMessage);
      setIsSpeaking(false);
    }
  }, [isSpeaking, onSpeakStart, onSpeakEnd, onError]);

  const stopSpeaking = useCallback(async () => {
    if (!voiceServiceRef.current) return;

    try {
      await voiceServiceRef.current.stopAll();
      setIsSpeaking(false);
    } catch (err) {
      console.error('Failed to stop speaking:', err);
    }
  }, []);

  const toggle = useCallback(async () => {
    if (isListening) {
      await stopListening();
    } else {
      await startListening();
    }
  }, [isListening, startListening, stopListening]);

  const reset = useCallback(() => {
    setTranscript('');
    setError(null);
    setIsProcessing(false);
  }, []);

  const updateConfig = useCallback((config: Partial<VoiceConfig>) => {
    if (voiceServiceRef.current) {
      voiceServiceRef.current.updateConfig(config);
    }
  }, []);

  // Sync states with voice service
  useEffect(() => {
    const interval = setInterval(() => {
      if (voiceServiceRef.current) {
        setIsListening(voiceServiceRef.current.isCurrentlyListening);
        setIsSpeaking(voiceServiceRef.current.isCurrentlySpeaking);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return {
    // States
    isListening,
    isSpeaking,
    isProcessing,
    transcript,
    error,
    
    // Actions
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    toggle,
    reset,
    
    // Configuration
    updateConfig,
  };
};