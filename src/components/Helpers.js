export function notification(setter) {
    setter(true);
    setTimeout(() => {
      setter(false);
    }, 4000);
  }
  
export function checkWin(correct, wrong, word) {
  // Initial state
  let status = 'win';

  // Check for win conditions
  // Split the word into single letters an loop over them
  word.split('').forEach(letter => {
    // Check if the letters include correct letters
    if(!correct.includes(letter)) {
      // If not then keep the state as it is
      status = '';
    }
  });
  
  // Check for lose
  // if the number of wrong guessed letters is bigger than 11 then set the state to lose
  if(wrong.length === 11) status = 'lose';
  
  return status
}