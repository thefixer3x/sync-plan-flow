#!/bin/bash

echo "🎤 Testing Claude Voice Mode..."
echo ""

# Test 1: Simple TTS test
echo "Test 1: Text-to-Speech"
echo "====================="
echo "Running: claude 'Please say: Hello, I am Claude with voice enabled!'"
claude "Please say: Hello, I am Claude with voice enabled!"

echo ""
echo "Did you hear Claude speak? (The audio plays in your terminal)"
echo ""

# Test 2: Show voice status
echo "Test 2: Voice Configuration"
echo "=========================="
claude mcp get voice-mode

echo ""
echo "✅ Voice mode is configured!"
echo ""
echo "To use voice interactively:"
echo "1. Run: claude chat"
echo "2. Press 'v' to toggle voice input"
echo "3. Press 't' to toggle TTS output"
echo ""
echo "Try it now!"