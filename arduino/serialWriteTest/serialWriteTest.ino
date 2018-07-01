struct periphVals{
  int button1pin = 2;
  bool button1;
  int button2pin = 3;
  bool button2;
  int joystickpin = 4;
  char joystick;
};

union periphUnion{
  periphVals vStruct;
  byte vBytes[sizeof(periphVals)];
};

union periphUnion p;

void setup() {  
  p.vStruct.button1 = true;
  Serial.begin(9600);

}

void loop() {
  digitalWrite(p.vStruct.button1pin,HIGH);
  


  
  Serial.write(p.vBytes,sizeof(periphVals));
}
