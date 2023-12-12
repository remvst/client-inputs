import { KeyBindingsSettings, BindingDefinitionSet, BindingDefinition, Keyboard, multi, set, DOMGamepadInputs, DOMKeyboardInputs, DOMMouseInputs, keyboard, MouseButton, mouse, isDown } from '@remvst/client-inputs';

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

const definitionSet = new BindingDefinitionSet([
    new BindingDefinition('movement', 'jump', 'Jump', true, set(keyboard(Keyboard.SPACE), mouse(MouseButton.LEFT_BUTTON))),
    new BindingDefinition('movement', 'left', 'Left', true, set(keyboard(Keyboard.LEFT))),
    new BindingDefinition('movement', 'right', 'Right', true, set(keyboard(Keyboard.RIGHT))),
    new BindingDefinition('movement', 'leftAndRight', 'Left and right', true, set(multi(keyboard(Keyboard.LEFT), keyboard(Keyboard.RIGHT)))),
    new BindingDefinition('movement', 'inspect', 'Inspect', true, set(multi(keyboard(Keyboard.COMMAND), mouse(MouseButton.LEFT_BUTTON)))),
]);

const settings = new KeyBindingsSettings(definitionSet);

function importSettings() {
    const json = JSON.parse(document.querySelector('textarea')!.value);
    settings.importJson(json);
}

function exportSettings() {
    document.querySelector('textarea')!.value = JSON.stringify(settings.toJson(), null, 1);
}

window.addEventListener('load', async () => {
    const debugPre = document.querySelector('pre')!;

    document.querySelector('#import')?.addEventListener('click', importSettings);
    document.querySelector('#export')?.addEventListener('click', exportSettings);
    exportSettings();

    function frame() {
        const debugged: {[key: string]: boolean} = {};
        for (const definition of definitionSet.definitions) {
            const description: string[] = [];
            const bindingSet = settings.binding(definition.key);
            for (const binding of bindingSet.bindings) {
                description.push(binding.label);
            }
            debugged[definition.label + ' - ' + description.join(' OR ')] = isDown(inputs, bindingSet);
        }
        debugPre.innerText = JSON.stringify(debugged, null, 4);

        requestAnimationFrame(frame);
    }

    frame();
});
