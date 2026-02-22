#!/bin/bash

# Enable Claude Code Voice Mode

echo "🎤 Enabling Claude Code Voice Mode..."
echo ""

# Option 1: Quick test with environment variables
echo "Option 1: Quick Test (temporary)"
echo "================================"
echo "Run these commands in your terminal:"
echo ""
echo "export OPENAI_API_KEY=\"your-openai-api-key\""
echo "export ELEVENLABS_API_KEY=\"your-elevenlabs-api-key\"  # Optional"
echo ""
echo "Then test with:"
echo "claude \"Hello Claude, please speak this response\""
echo ""

# Option 2: Permanent setup
echo "Option 2: Permanent Setup"
echo "========================="
echo "Add to your ~/.zshrc or ~/.bashrc:"
echo ""
echo "# Claude Voice Mode"
echo "export OPENAI_API_KEY=\"your-openai-api-key\""
echo "export ELEVENLABS_API_KEY=\"your-elevenlabs-api-key\""
echo ""

# Option 3: Project-specific
echo "Option 3: Project-Specific Setup"
echo "================================"
echo "Create a .env file in your project:"
echo ""
echo "OPENAI_API_KEY=your-key"
echo "ELEVENLABS_API_KEY=your-key"
echo ""
echo "Then source it: source .env"
echo ""

# Test commands
echo "🧪 Test Commands:"
echo "================="
echo "1. Basic voice test:"
echo "   claude \"Say hello in a friendly voice\""
echo ""
echo "2. Interactive voice chat:"
echo "   claude chat"
echo "   (Press 'v' to toggle voice input)"
echo ""
echo "3. Voice coding:"
echo "   claude \"Create a Python hello world script\""
echo ""
echo "4. Check if voice is working:"
echo "   claude mcp list | grep voice-mode"
echo ""

# Check current status
echo "📊 Current Status:"
echo "=================="
if [ -n "$OPENAI_API_KEY" ]; then
    echo "✅ OPENAI_API_KEY is set"
else
    echo "❌ OPENAI_API_KEY not set"
fi

if [ -n "$ELEVENLABS_API_KEY" ]; then
    echo "✅ ELEVENLABS_API_KEY is set (optional)"
else
    echo "ℹ️  ELEVENLABS_API_KEY not set (optional)"
fi

# Check if voice-mode is installed
if claude mcp list | grep -q "voice-mode"; then
    echo "✅ voice-mode MCP server is installed"
else
    echo "❌ voice-mode not found. Installing..."
    claude mcp add voice-mode -- uvx voice-mode
fi

echo ""
echo "Ready! Set your API keys and try the test commands above."