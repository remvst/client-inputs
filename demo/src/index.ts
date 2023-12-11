import { Keyboard, MultiBind, BindingSet, DOMGamepadInputs, DOMKeyboardInputs, DOMMouseInputs, KeyboardBind, MouseButton, MouseButtonBind, isDown } from '@remvst/client-inputs';

const keyboard = new DOMKeyboardInputs();
const mouse = new DOMMouseInputs(document.body, { 
    width: window.innerWidth, 
    height: window.innerHeight, 
});
const gamepad = new DOMGamepadInputs();

keyboard.setup();
mouse.setup();
gamepad.setup();

const inputs = { keyboard, mouse, gamepad };

const definitions = new Map([
    ['jump', new BindingSet([
        new KeyboardBind(Keyboard.SPACE),
        new MouseButtonBind(MouseButton.LEFT_BUTTON),
    ])],
    ['left', new BindingSet([
        new KeyboardBind(Keyboard.LEFT),
    ])],
    ['right', new BindingSet([
        new KeyboardBind(Keyboard.RIGHT),
    ])],
    ['leftAndRight', new BindingSet([
        new MultiBind([
            new KeyboardBind(Keyboard.LEFT),
            new KeyboardBind(Keyboard.RIGHT),
        ]),
    ])],
    ['inspect', new BindingSet([
        new MultiBind([
            new KeyboardBind(Keyboard.COMMAND),
            new MouseButtonBind(MouseButton.LEFT_BUTTON),
        ]),
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
