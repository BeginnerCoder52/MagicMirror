import queue
import sounddevice as sd
import sys
import json
from vosk import Model, KaldiRecognizer
import subprocess
import os

model_path = os.path.join(os.path.dirname(__file__), "model")
model = Model("/home/richardmelvin52/MagicMirror/modules/MMM-voice/model")
print(sd.query_devices(1))  # hoặc số device đúng
q = queue.Queue()

def callback(indata, frames, time, status):
    if status:
        print(status, file=sys.stderr)
    q.put(bytes(indata))

device = 1  # Card 1 theo `arecord -l`
samplerate = 44100

rec = KaldiRecognizer(model, samplerate)

print("🎤 Voice listener is running... Say something!")

with sd.RawInputStream(samplerate=samplerate, blocksize=8000, device=device,
                       dtype='int16', channels=1, callback=callback):
    while True:
        data = q.get()
        if rec.AcceptWaveform(data):
            result = json.loads(rec.Result())
            text = result.get("text", "").lower()
            if text:
                print(f"🗣️ You said: {text}")

                # Map voice to MagicMirror commands
                if "hello magic mirror" in text:
                    subprocess.run(["curl", "http://localhost:8080/api/notify", 
                                    "-H", "Content-Type: application/json", 
                                    "-d", '{"notification":"SHOW_ALERT","payload":{"message":"Hello!","title":"Voice"}}'])

                elif "show all modules" in text:
                    subprocess.run(["curl", "http://localhost:8080/api/module/show/all"])

                elif "hide all modules" in text:
                    subprocess.run(["curl", "http://localhost:8080/api/module/hide/all"])

                elif "turn off magic mirror" in text:
                    subprocess.run(["curl", "http://localhost:8080/api/remote?action=SHUTDOWN"])
