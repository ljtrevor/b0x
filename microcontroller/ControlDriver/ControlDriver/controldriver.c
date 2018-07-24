#ifdef _MSC_VER			//IntelliSense override
#define __AVR_ATtiny13__	
#endif

#define BUTTON
#define BUTTON4


#define F_CPU 20000000UL

#define LED PINB4
#define INPUT PINB3
#define MOSI PINB0
#define SCK PINB2
#define SS PINB4

#include <avr/io.h>
#include <util/delay.h>

void data_out(uint8_t);
void read(uint8_t*);

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

int main(void)
{
	DDRB |= _BV(MOSI);
	DDRB |= _BV(SCK);
	DDRB |= _BV(SS);
	PORTB |= _BV(INPUT);

#ifdef BUTTON1
	read(&data.cd.button1);
#endif // BUTTON1
#ifdef BUTTON2
	read(&data.cd.button2);
#endif // BUTTON2
#ifdef BUTTON3
	read(&data.cd.button3);
#endif // BUTTON3
#ifdef BUTTON4
	read(&data.cd.button4);
#endif // BUTTON3




	int i;
	int s = sizeof(struct controldata);
	PORTB |= _BV(SS);
	PORTB &= ~_BV(SS);
	for (i = 0; i <= s; i++) {
		data_out(data.byte[i]);
	}
	PORTB = 0;
	return 0;
}

void read(uint8_t *val) {
#ifdef BUTTON
	*val = ((PINB & _BV(INPUT)) >> INPUT) ^ 1;
#endif // BUTTON
}

void data_out(uint8_t datain) //Data Output Serial Interface
{
	uint8_t n;
	uint8_t t;

	for (n = 0; n<8; n++) {
		PORTB &= ~_BV(SCK);// SCL = 0;
		t = datain >> 7;
		if (t == 1)
			PORTB |= _BV(MOSI);
		else
			PORTB &= ~_BV(MOSI);
		datain <<= 1;
		_delay_ms(1);
		PORTB |= _BV(SCK); //SCL = 1;
		_delay_ms(1);
	}
}