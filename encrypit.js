/*
 * CSE 154
 * Starter file to help get you started with Section 06 Encrypt-It exercise.
 */

(function() {
    "use strict";

    window.onload = function() {
        $("encrypt-it").onclick = generateCipher;
        $("reset").onclick = function() {
          $("output").innerText = "";
        };
        let fontSizeOptions = $$("input[name=text-size]");
        for (let i = 0; i < fontSizeOptions.length; i++) {
          fontSizeOptions[i].onchange = function() {
            $("output").style.fontSize = this.value;
          };
        }
      }
      
      function generateCipher() {
        if ($("cipher-type").value == "shift") {
          $("output").innerText = shiftCipher($("input-text").value.toLowerCase());
        } else {
          $("output").innerText = randomCipher($("input-text").value.toLowerCase());
        }
      }
       
      /**
       * Returns an encrypted version of the given text, where
       * each letter is shifted alphabetically ahead by 1 letter,
       * and 'z' is shifted to 'a' (creating an alphabetical cycle).
       */
      function shiftCipher(text) {
        text = text.toLowerCase();
        let result = "";
        for (let i = 0; i < text.length; i++) {
          if (!isLowerCaseLetter(text[i])) { // keep non-letter characters the same 
            result += text[i];
          } else if (text[i] == 'z') {
            result += 'a';
          } else { // letter is between 'a' and 'y'
            let letter = text.charCodeAt(i); 
            let resultLetter = String.fromCharCode(letter + 1);
            result += resultLetter;
          }
        }
        if ($("all-caps").checked) {
          result = result.toUpperCase();
        }
        return result;
      }
      
      function randomCipher(text) {
        let alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
        let cipher = [];
        // it's poor style to hardcode a magic number like 26
        let alphabetLength = alphabet.length;
        for (let i = 0; i < alphabetLength; i++) {
          let randomIndex = Math.floor(Math.random() * alphabet.length);
           
          cipher.push(alphabet.splice([Math.floor(Math.random() * alphabet.length)], 1));
        }
        let result = "";
        for (let i = 0; i < text.length; i++) {
          if (isLowerCaseLetter(text[i])) {
            let letterCode = text.charCodeAt(i) - 'a'.charCodeAt(0);
            result += cipher[letterCode];
          } else {
            result += text[i];
          }
        }
        result = result.replace(",", "");
        if ($("all-caps").checked) {
          result = result.toUpperCase();
        }
        return result;
      }
      
      /* Helper Functions */
      function $(id) {
        return document.getElementById(id);
      }
      
      function $$(clazz) {
        return document.querySelectorAll(clazz);
      }
    
      function isLowerCaseLetter(c) {
        return c >= 'a' && c <= 'z';
      }
    
    })();
  
    /**
     * The starting point in our program, setting up a listener
     * for the "load" event on the window, signalling the HTML DOM has been constructed
     * on the page. When this event occurs, the attached function (init) will be called.
     */
    window.addEventListener("load", init);
  
    /**
     * TODO: Write a function comment using JSDoc.
     */
    function init() {
      // Note: In this function, we usually want to set up our event handlers
      // for UI elements on the page.
    }
  
    
    // Add any other functions in this area (you should not implement your
    // entire program in the init function, for similar reasons that
    // you shouldn't write an entire Java program in the main method).