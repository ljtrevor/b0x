#include <iostream>
#include <windows.h>

int main() {
    INPUT ctrlV [6];
    ZeroMemory(ctrlV, sizeof ctrlV);

    ctrlV [0].type = INPUT_KEYBOARD;
    ctrlV [0].ki.wVk = VK_LCONTROL;

    ctrlV [1].type = INPUT_KEYBOARD;
    ctrlV [1].ki.wVk = VK_LSHIFT;

    ctrlV [2].type = INPUT_KEYBOARD;
    ctrlV [2].ki.wVk = VK_TAB;

    ctrlV [3].type = INPUT_KEYBOARD;
    ctrlV [3].ki.wVk = VK_TAB;
    ctrlV [3].ki.dwFlags = KEYEVENTF_KEYUP;

    ctrlV [4].type = INPUT_KEYBOARD;
    ctrlV [4].ki.wVk = VK_LSHIFT;
    ctrlV [4].ki.dwFlags = KEYEVENTF_KEYUP;

    ctrlV [5].type = INPUT_KEYBOARD;
    ctrlV [5].ki.wVk = VK_LCONTROL;
    ctrlV [5].ki.dwFlags = KEYEVENTF_KEYUP;

    SendInput (6, ctrlV, sizeof (INPUT));

    return 0;
}