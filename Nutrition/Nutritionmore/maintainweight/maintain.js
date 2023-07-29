document.getElementById('tdeeForm').addEventListener('submit', function(event) {
  event.preventDefault();
  calculateTDEE();
});

function calculateTDEE() {
  const units = document.getElementById('units').value;
  let gender = document.querySelector('input[name="gender"]:checked').value;
  let age = Number(document.getElementById('age').value);
  let weight = Number(document.getElementById('weight').value);
  let height = Number(document.getElementById('height').value);
  let activity = Number(document.getElementById('activity').value);

  if (units === 'imperial') {
      weight = weight * 0.453592; // convert lbs to kg
      height = height * 2.54; // convert inches to cm
  }

  // Calculate BMR using Mifflin-St Jeor equation
  let BMR;
  if (gender === 'male') {
      BMR = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
      BMR = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  // Calculate TDEE
  let TDEE = BMR * activity;

  // Calculate TDEE for each activity level
  let TDEESedentary = BMR * 1.2;
  let TDEELightExercise = BMR * 1.375;
  let TDEEModerateExercise = BMR * 1.55;
  let TDEEHeavyExercise = BMR * 1.725;
  let TDEEAthlete = BMR * 1.9;

  // Calculate macronutrient splits
  let lowCarb = {
    protein: (TDEE * 0.4) / 4,
    fat: (TDEE * 0.4) / 9,
    carbs: (TDEE * 0.2) / 4
  };
  let highCarb = {
    protein: (TDEE * 0.4) / 4,
    fat: (TDEE * 0.25) / 9,
    carbs: (TDEE * 0.35) / 4
  };
  let balanced = {
    protein: (TDEE * 0.3) / 4,
    fat: (TDEE * 0.3) / 9,
    carbs: (TDEE * 0.4) / 4
  };


  //recommended
  let weightInLbs = weight*2.2;


  let recommended = {
      protein: weightInLbs,
      fat: ((TDEE - (weightInLbs * 4)) / 2) / 9,
      carbs: ((TDEE - (weightInLbs * 4)) / 2) / 4
  };
  

 // Create a new container for results
 let resultsContainer = document.createElement('div');
 resultsContainer.classList.add('resultsContainer');

 // Create a title for the results
 let resultsTitle = document.createElement('h1');
 resultsTitle.classList.add('resultsTitle');
 resultsTitle.textContent = 'Your Results';
 resultsContainer.appendChild(resultsTitle);

 // Create a paragraph for the Personal Maintenance Calories
 let maintenanceCalories = document.createElement('p');
 maintenanceCalories.classList.add('maintenanceCalories');
 maintenanceCalories.textContent = `Your Personal Maintenance Calories: ${Math.round(TDEE)} calories per day.`;
 resultsContainer.appendChild(maintenanceCalories);

 // Create a paragraph for the Basal Metabolic Rate
 let bmr = document.createElement('p');
 bmr.classList.add('bmr');
 bmr.textContent = `Your Basal Metabolic Rate is ${Math.round(BMR)} calories per day.`;
 resultsContainer.appendChild(bmr);

 // Create a paragraph for the TDEE at different activity levels
 let activityLevels = document.createElement('p');
 activityLevels.classList.add('activityLevels');
 activityLevels.innerHTML = `Here are what your maintenance calories would like look at different activity levels:<br>
 Sedentary: ${Math.round(TDEESedentary)} calories per day<br>
 Light Exercise: ${Math.round(TDEELightExercise)} calories per day<br>
 Moderate Exercise: ${Math.round(TDEEModerateExercise)} calories per day<br>
 Heavy Exercise: ${Math.round(TDEEHeavyExercise)} calories per day<br>
 Athlete: ${Math.round(TDEEAthlete)} calories per day<br>`;
 resultsContainer.appendChild(activityLevels);

 // Create a paragraph for the Macronutrient Splits
 let macronutrientSplits = document.createElement('p');
 macronutrientSplits.classList.add('macronutrientSplits');
 macronutrientSplits.innerHTML = `High Protein Low Carb (40/40/20): Protein - ${Math.round(lowCarb.protein)}g, Fat - ${Math.round(lowCarb.fat)}g, Carbs - ${Math.round(lowCarb.carbs)}g<br>
 High Protein Low Fat (40/35/25): Protein - ${Math.round(highCarb.protein)}g, Fat - ${Math.round(highCarb.fat)}g, Carbs - ${Math.round(highCarb.carbs)}g<br>
 Balanced: Protein - ${Math.round(balanced.protein)}g, Fat - ${Math.round(balanced.fat)}g, Carbs - ${Math.round(balanced.carbs)}g<br>
 Recommended: Protein - ${Math.round(recommended.protein)}g, Fat - ${Math.round(recommended.fat)}g, Carbs - ${Math.round(recommended.carbs)}g`;
 resultsContainer.appendChild(macronutrientSplits);


// Replace usersection with new results
let userSection = document.querySelector('.usersection');
userSection.innerHTML = '';
userSection.appendChild(resultsContainer);

// Create reveal button after generating results
let revealButtonContainer = document.createElement('div');
revealButtonContainer.classList.add('revealButtonContainer');

let revealButton = document.createElement('button');
revealButton.id = 'revealButton';
revealButton.textContent = 'Reveal hidden text';
revealButtonContainer.appendChild(revealButton);

// Create the hidden text
let hiddenText = document.createElement('p');
hiddenText.id = 'hiddenText';
hiddenText.textContent = 'Boo';
hiddenText.style.display = 'none'; // make it hidden initially
revealButtonContainer.appendChild(hiddenText);

// append button and hidden text after usersection
document.querySelector('.maincontainer').appendChild(revealButtonContainer);
}

document.addEventListener('click', function(e) {
  if (e.target && e.target.id === 'revealButton') {
    var hiddenText = document.getElementById('hiddenText');
    var revealButton = document.getElementById('revealButton');

    if (hiddenText.style.display === 'none') {
      hiddenText.style.display = 'block';
      revealButton.textContent = 'Hide message';
    } else {
      hiddenText.style.display = 'none';
      revealButton.textContent = 'Reveal hidden text';
    }
  }
});