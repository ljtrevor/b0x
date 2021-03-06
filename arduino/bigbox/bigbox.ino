//#define DEBUG

#include <SPI.h>

// code input pins
#define P1 9
#define P2 8
#define P3 7
#define P4 6
#define P5 5
#define P6 4

#define INPUTSIZE 6

void getData(int);

struct controldata {
  uint8_t button1;
  uint8_t button2;
  uint8_t button3;
  uint8_t button4;
  uint8_t slider1;
  uint8_t slider2;
  uint8_t dial1;
};

union Data {
  struct controldata cd;
  uint8_t byte[sizeof(struct controldata)];
};

union Data data;
int sizestruct = sizeof(struct controldata);
int inputs[INPUTSIZE] = {P1, P2, P3, P4, P5, P6};
volatile int pos;

 void setup() {
  Serial.begin(115200);
#ifdef DEBUG

  Serial.println("test\n");
#endif
  pinMode(SCK, INPUT);
  pinMode(MOSI, INPUT);
  pinMode(MISO, OUTPUT);
  int i;
  for (i = 0; i < INPUTSIZE; i++){
    pinMode(inputs[i], OUTPUT);
    digitalWrite(inputs[i], LOW);
  }

  SPCR = (1 << SPE);

  pos = 0;
  SPI.attachInterrupt();
}

ISR (SPI_STC_vect){
  byte c = SPDR;
#ifdef DEBUG
  Serial.println("in isr");
  Serial.println(c);
  Serial.println(pos);
#endif
  data.byte[pos] |= c;
  pos++;
  }
  
void loop() {
    memset(data.byte, 0, sizestruct);
    int i;
    for (i = 0; i < INPUTSIZE; i++){
      getData(inputs[i]);
      }
    // Your data is ready now.
    // Can output to PC
    Serial.println('$');
    Serial.println(data.cd.button1);
    Serial.println(data.cd.button2);
    Serial.println(data.cd.button3);
    Serial.println(data.cd.button4);
    Serial.println(data.cd.slider1);
    Serial.println(data.cd.slider2);
    Serial.println(data.cd.dial1);
    
    //delay(1);

}

void getData(int port){
  pos = 0;
  digitalWrite(port, HIGH);
#ifdef DEBUG
  Serial.print(port);
  Serial.println("port high");
#endif
  int i = 0;
  while (pos < sizestruct){
      int oldposition = pos;
      delay(80);
      i++;
      if (pos == oldposition){ // Timeout on response
        pos = 0;
        break;
      }
      
  }
    
  digitalWrite(port, LOW);
  //Serial.println("golow");
  //Serial.println(data.cd.button1);
  }

