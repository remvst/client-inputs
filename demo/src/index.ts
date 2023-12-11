import { Keyboard, multi, BindingSet, DOMGamepadInputs, DOMKeyboardInputs, DOMMouseInputs, keyboard, MouseButton, mouse, isDown } from '@remvst/client-inputs';

const keyboardInputs = new DOMKeyboardInputs();
const mouseInputs = new DOMMouseInputs(document.body, { 
    width: window.innerWidth, 
    height: window.innerHeight, 
});
const gamepadInputs = new DOMGamepadInputs();

keyboardInputs.setup();
mouseInputs.setup();
gamepadInputs.setup();

const inputs = { 
    keyboard: keyboardInputs, 
    mouse: mouseInputs, 
    gamepad: gamepadInputs, 
};

const definitions = new Map([
    ['jump', new BindingSet([
        keyboard(Keyboard.SPACE),
        mouse(MouseButton.LEFT_BUTTON),
    ])],
    ['left', new BindingSet([
        keyboard(Keyboard.LEFT),
    ])],
    ['right', new BindingSet([
        keyboard(Keyboard.RIGHT),
    ])],
    ['leftAndRight', new BindingSet([
        multi(
            keyboard(Keyboard.LEFT),
            keyboard(Keyboard.RIGHT),
        ),
    ])],
    ['inspect', new BindingSet([
        multi(
            keyboard(Keyboard.COMMAND),
            mouse(MouseButton.LEFT_BUTTON),
        ),
    ])],
])

window.addEventListener('load', async () => {
    const debugPre = document.querySelector('pre')!;

    function frame() {
        const debugged: {[key: string]: boolean} = {};
        for (const [label, bindingSet] of definitions) {
            const description: string[] = [];
            for (const binding of bindingSet.bindings) {
                description.push(binding.label);
            }
            debugged[label + ' - ' + description.join(' OR ')] = isDown(inputs, bindingSet);
        }
        debugPre.innerText = JSON.stringify(debugged, null, 4);

        requestAnimationFrame(frame);
    }

    frame();
});
