#include <iostream>
#include <windows.h>

int main() {
    INPUT ctrlV [4];
    ZeroMemory(ctrlV, sizeof ctrlV);

    ctrlV [0].type = INPUT_KEYBOARD;
    ctrlV [0].ki.wVk = VK_LCONTROL;

    ctrlV [1].type = INPUT_KEYBOARD;
    ctrlV [1].ki.wVk = 'T'; //assuming ASCII

    ctrlV [2].type = INPUT_KEYBOARD;
    ctrlV [2].ki.wVk = 'T'; //assuming ASCII
    ctrlV [2].ki.dwFlags = KEYEVENTF_KEYUP;

    ctrlV [3].type = INPUT_KEYBOARD;
    ctrlV [3].ki.wVk = VK_LCONTROL;
    ctrlV [3].ki.dwFlags = KEYEVENTF_KEYUP;

    SendInput (4, ctrlV, sizeof (INPUT));

    return 0;
}