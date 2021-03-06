from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit
from gevent.pywsgi import WSGIServer
from geventwebsocket.handler import WebSocketHandler
from praCamera import praCamera
import base64,pygame
from time import sleep
import RPi.GPIO as GPIO
from pydub import AudioSegment

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
# socketio = SocketIO(app)

# cam = praCamera(on_memory=True,resolution=(640,480))

GPIO.setwarnings(False)
GPIO.cleanup()
GPIO.setmode(GPIO.BCM)
GPIO.setup(24, GPIO.OUT)
GPIO.setup(25, GPIO.OUT)

MOTOR_BACK = GPIO.PWM(24, 50)
MOTOR_BACK.start(0)
MOTOR_FRONT = GPIO.PWM(25, 50)
MOTOR_FRONT.start(0)
SPEED=0

@app.route('/')
def index():
    return render_template('index.html')

@app.route("/speed",methods=["POST"])
def speed():
    global SPEED
    SPEED = int(request.json["speed"]) * 15
    print(SPEED)
    if SPEED > 0:
        MOTOR_BACK.ChangeDutyCycle(0)
        MOTOR_FRONT.ChangeDutyCycle(SPEED)
    else:
        MOTOR_FRONT.ChangeDutyCycle(0)
        MOTOR_BACK.ChangeDutyCycle(-SPEED)
    return request.json


@app.route("/sound/<name>")
def sound(name=None):
    print(name)
    if name == None:
        return None
    else:
        sound_file = "./sound/" + name +".mp3"
        sound_detail = AudioSegment.from_file(sound_file, "mp3")
        pygame.mixer.init()
        pygame.mixer.music.load(sound_file)
        pygame.mixer.music.play(1)
        sleep(sound_detail.duration_seconds)
        pygame.mixer.music.stop()
        return None




if __name__ == '__main__':
    # socketio.run(app,debug=True,host="0.0.0.0",port=5000)
    app.run(debug=True,host="0.0.0.0",port=5000)