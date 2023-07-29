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
hiddenText.textContent = `Your Total Daily Energy Expenditure (TDEE) is an estimation of how 
many calories you burn per day after exercise/activity is taken into account. 

A person will burn calories continually throughout the 
day in order to sustain basic life functions, such as breathing, circulation, and digestion. The measurement of which
this natural energy requirement occurs is known as Basal Metabolic Rate, or BMR. A person's BMR is an
estimate of the minimum number of calories a person needs each day to maintain these functions at a resting state,
basically meaning that even if you stayed in bed all day without any direct physical movement, you would still automatically 
burn your BMR's worth of calories. To calculate our BMR, we use the Mifflin-St Jeor Formula, which accounts for one's
gender, weight, height, and age. 

Luckily, most of us are not in bed all day, and we experience a various movements and exercises, from standing up and walking
around to more intentional tasks such as weightlifting and running. To account for this additional caloric burn, we take our
BMR and multiply it by an activity/lifestyle factor, depending on if you live a sedentary life, do light exercise, moderate
exericise, heavy exercise, etc. Then, we finally reach our Total Daily Energy Expenditure (TDEE), which is how many calories
we burn in a day, accounting for our BMR (for basic life sustaining functions like breathing) and our activity (like
movement and exercise).

In humans, the laws of thermodynamics are absolute and caloric balance determines our physical composition. Therefore, weight
manipulation is quite simple: eat at your TDEE to maintain weight, eat less than your TDEE to lose weight, and eat more
than your TDEE to gain weight. We can interpret this as a CICO (calories in, calories out) equation, where if we consume less
calories than our body needs/burns, it will find that energy within our stored fat and consume that as we 'lose weight'.
If we consume more calories than our body needs/burns, it does not need that additional energy immediately and will store
it in our body as either muscle/fat depending on our training, as we 'gain weight. If we consume exactly as many calories
as our body needs/burns, we are at a state of equilibrium and the body has no need to find/burn or store/gain weight.

Everything we consume has calories (except for water), and these calories can be broken down into 3 major macronutrients:
protein, carbohydrates, and fats.


Protein

Proteins, one of the macronutrient types, are organic compounds composed of amino acids,
crucial for overall health. Certain amino acids, known as "essential amino acids," 
can only be sourced through our diet. They can be derived from various sources, including both animal 
(like meat and dairy) and plant-based foods (like beans, legumes, nuts, and seeds). Protein supplements 
also exist, often utilized by those aiming to build muscle mass. Despite the importance of protein, it's 
necessary to consume it in moderation and choose healthier sources when possible. Healthier proteins 
include soy, beans, nuts, fish, skinless poultry, lean beef, pork, and low-fat dairy products, while 
unhealthier options encompass fried meats, processed meats, high-sugar yogurts, processed protein bars, 
and many types of cheese.

Carbohydrates

Commonly known as "carbs," carbohydrates are typically categorized as sugar, starch, or fiber. 
Sugars are simple carbohydrates, while starch and fiber are complex carbohydrates. They can also 
be classified based on the number of saccharides they contain: monosaccharides, disaccharides, 
oligosaccharides, and polysaccharides. Simple carbohydrates include monosaccharides and disaccharides, 
while complex carbohydrates include oligosaccharides and polysaccharides. Glucose, a monosaccharide, is 
a primary energy source for humans and animals. While polysaccharides like cellulose can't be easily 
metabolized by many organisms, they provide valuable dietary fibers aiding digestion. Excessive simple 
carbohydrates (sugars) can lead to adverse health effects, but complex carbohydrates (from vegetables, 
  fruits, whole grains, legumes, etc.) are beneficial and necessary for our bodies.

Fat

Fats, primarily composed of carbon and hydrogen atoms, include cholesterol, phospholipids, and
triglycerides. While often viewed as unhealthy, they have structural and metabolic roles and are vital 
in our diet. They are the most energy-dense macronutrients and serve as the most efficient energy storage. 
Based on the bonding of carbon atoms, dietary fats are classified into saturated fats, unsaturated fats, trans fats, 
monounsaturated fats, polyunsaturated fats, and omega-3 fatty acids. Saturated and trans fats are generally considered 
unhealthy, while monounsaturated, polyunsaturated, and omega-3 fatty acids are healthier fat sources. Dietary Guidelines 
for Americans (2015-2020) recommend avoiding trans fats, limiting saturated fat intake to less than 10% of daily calories, 
and replacing saturated fats with monounsaturated and polyunsaturated fats whenever possible.
`;


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



function validateForm() {
  var units = document.getElementById("units").value;
  var age = document.getElementById("age").value.trim();
  var weight = document.getElementById("weight").value.trim();
  var height = document.getElementById("height").value.trim();
  var activity = document.getElementById("activity").value.trim();
  
  var gender = document.querySelector('input[name="gender"]:checked');
  
  if (units === "" || age === "" || weight === "" || height === "" || activity === "" || gender === null) {
      document.getElementById("error_message").innerText = "Error: You forgot to fill out one or more fields.";
      return false;  // this will prevent form from submitting
  }

  return true;  // form will be submitted
}

document.getElementById('tdeeForm').addEventListener('submit', function(event) {
  event.preventDefault();
  if(validateForm()) {
    calculateTDEE();
  }
});


revealButton.addEventListener('click', function() {
    hiddenText.style.display = 'block';
    revealButton.style.display = 'none';
});
