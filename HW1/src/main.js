    import { randomElement } from "./utils.js";
    
    let words1 = [];
	
	let words2 = [];
	
	let words3 = [];

    window.onload = () => 
    {
        loadBabble();
    }

    const init = () =>
    {
    
    generateTechno(1);
    //document.querySelector("#btn-gen-1").onclick = generate;
    document.querySelector("#btn-gen-1").addEventListener("click", () => generateTechno(1));
    document.querySelector("#btn-gen-5").addEventListener("click", () => generateTechno(5));
    }

    const loadBabble = () =>
    {
        loadJsonXHR();

        document.querySelector("#btn-gen-1").addEventListener("click", () => generateTechno(1));
        document.querySelector("#btn-gen-5").addEventListener("click", () => generateTechno(5));
    }

    const generate = () => 
    {
        //return randomElement(words1) + " " + randomElement(words2) + " " + randomElement(words3);
        const str = `${randomElement(words1)} ${randomElement(words2)} ${randomElement(words3)}`;
        document.querySelector("#output").innerHTML = str;
    }

    const generateTechno = (num) =>
    {
        let strng = ""; 
        for (let i = 0; i < num; i++)
        {
            strng += `${randomElement(words1)} ${randomElement(words2)} ${randomElement(words3)}\n`;

            
        }
        document.querySelector("#output").innerHTML = strng
    }

    const loadJsonXHR = () =>
    {
        const url = "data/babble-data.json";
        const xhr = new XMLHttpRequest();
        xhr.onload = (e) => {
            console.log(`In onload - HTTP Status Code = ${e.target.status}`);
            const string = e.target.responseText;
            let json;
            try {
                json = JSON.parse(string);
            } catch (err) {
                console.log(`ERROR: ${err}`);
                document.querySelector("#output").innerHTML = "JSON ERROR";
                return;
            }

            // Put data into word arrays
            words1 = json.words1;
            words2 = json.words2;
            words3 = json.words3;

            generateTechno(1);
        }
        xhr.onerror = e => console.log(`In onerror - HTTP Status Code = ${e.target.status}`);
        xhr.open("GET", url);
        xhr.send();
    }
