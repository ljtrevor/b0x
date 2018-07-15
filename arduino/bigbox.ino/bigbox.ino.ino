#include <SPI.h>

#define B1 9

#define INPUTSSIZE 1

void getData(int);

struct controldata {
  uint8_t button1;
  uint8_t button2;
  uint8_t button3;
  uint8_t button4;
  uint16_t slider1;
  uint16_t slider2;
  uint16_t dial1;
};

union Data {
  struct controldata cd;
  uint8_t byte[sizeof(struct controldata)];
};

union Data data;
int sizestruct = sizeof(struct controldata);
int inputs[INPUTSSIZE] = {B1};
volatile int pos;
 
 void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  Serial.println("test\n");
  pinMode(SCK, INPUT);
  pinMode(MOSI, INPUT);
  pinMode(MISO, OUTPUT);
  pinMode(B1, OUTPUT);
  digitalWrite(B1, LOW);

  SPCR = (1 << SPE);

  pos = 0;
  SPI.attachInterrupt();
}

ISR (SPI_STC_vect){
  Serial.println("in isr");
  byte c = SPDR;
  Serial.println(c);

  data.byte[pos] |= c;
  pos++;
  Serial.println(pos);
  }
  
void loop() {
    memset(data.byte, 0, sizestruct);
    int i;
    for (i = 0; i < INPUTSSIZE; i++){
      getData(inputs[i]);
      }
    Serial.println(data.byte[0]);
    delay(10);
}

void getData(int port){
  pos = 0;
  digitalWrite(port, HIGH);
  Serial.println("gothigh");
  while (pos < sizestruct){
    }
  digitalWrite(port, LOW);
  Serial.println("golow");
  Serial.println(data.cd.button1);
  }

