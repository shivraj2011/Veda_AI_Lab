import asyncio
import edge_tts
import sys
import uuid
import os

# Usage: python tts.py "Text to speak" "VoiceName" "OutputFolder"
# Example Voices: en-US-ChristopherNeural, en-GB-SoniaNeural

async def generate_voice(text, voice, output_folder):
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
        
    filename = f"{uuid.uuid4()}.mp3"
    output_path = os.path.join(output_folder, filename)
    
    communicate = edge_tts.Communicate(text, voice)
    await communicate.save(output_path)
    
    # Print filename to stdout for Node.js to capture
    print(filename)

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Error: Missing arguments")
        sys.exit(1)
        
    text = sys.argv[1]
    voice = sys.argv[2] if len(sys.argv) > 2 else "en-US-ChristopherNeural"
    output_folder = sys.argv[3] if len(sys.argv) > 3 else "./public/voices"
    
    asyncio.run(generate_voice(text, voice, output_folder))
