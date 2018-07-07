#ifdef _MSC_VER			//IntelliSense override
#define __AVR_ATtiny13__	
#endif

#include <avr/io.h>
#define F_CPU 20000000UL
#include <util/delay.h>

int main(void)
{
	DDRB = 8; // PB3 will be output, all others input
	while (1)
	{
		PORTB |= _BV(PINB3);
		_delay_ms(2000);
		PORTB = 0;
		_delay_ms(2000);
	}
	return 0;
}