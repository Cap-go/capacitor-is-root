import { IsRoot } from '@capgo/capacitor-is-root';

window.testEcho = () => {
    const inputValue = document.getElementById("echoInput").value;
    IsRoot.echo({ value: inputValue })
}
