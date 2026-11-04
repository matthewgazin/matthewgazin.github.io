// SHA-256 of the lowercase password. The password itself is not stored in the site.
const PASSWORD_HASH = "0087d194d4cd5851f2fe7a6ae0e8351a029c4d3f657580bb9abb54c1b5478d95";
const FLAG = "matthew-site-unlocked";

async function sha256(text){
  const bytes = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,"0")).join("");
}

async function checkPassword(input){
  return (await sha256(input.trim().toLowerCase())) === PASSWORD_HASH;
}

function isUnlocked(){ return sessionStorage.getItem(FLAG) === "1"; }
function unlock(){ sessionStorage.setItem(FLAG, "1"); }
function lock(){ sessionStorage.removeItem(FLAG); }

// Call on protected pages: sends visitors back to the password screen.
function requireUnlock(){ if(!isUnlocked()) location.replace("index.html"); }
