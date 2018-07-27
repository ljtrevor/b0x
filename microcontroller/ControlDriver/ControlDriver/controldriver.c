#ifdef _MSC_VER			//IntelliSense override
#define __AVR_ATtiny13__	
#endif

#define SLIDER
#define SLIDER1

#define F_CPU 250000UL

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
	uint8_t slider1;
	uint8_t slider2;
	uint8_t dial1;
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
#ifdef BUTTON
	PORTB |= _BV(INPUT);
#endif // BUTTON
#ifdef SLIDER
	ADMUX |= _BV(MUX0);
	ADMUX |= _BV(MUX1);
	ADMUX |= _BV(ADLAR);
	ADCSRA |= _BV(ADPS1) | _BV(ADPS0);
	ADCSRA |= _BV(ADEN);
	ADCSRA |= _BV(ADSC);
#endif // SLIDER



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
#ifdef SLIDER1
	read(&data.cd.slider1);
#endif // SLIDER1
#ifdef SLIDER2
	read(&data.cd.slider2);
#endif // SLIDER2
#ifdef DIAL1
	read(&data.cd.dial1);
#endif // DIAL1


	int i;
	int s = sizeof(struct controldata);
	PORTB |= _BV(SS);
	PORTB &= ~_BV(SS);
	for (i = 0; i < s; i++) {
		data_out(data.byte[i]);
	}
	PORTB = 0;
	return 0;
}

void read(uint8_t *val) {
#ifdef BUTTON
	*val = ((PINB & _BV(INPUT)) >> INPUT) ^ 1;
#endif // BUTTON
#ifdef SLIDER
	int i;
	for (i = 0; i < 2; i++) {
		*val = ADCH;
	/*	if (*val < 128)
			PORTB |= _BV(SS);
		else
			PORTB &= ~_BV(SS);*/
		_delay_ms(1);
	}
#endif // SLIDER

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