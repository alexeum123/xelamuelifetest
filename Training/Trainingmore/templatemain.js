document.getElementById('upper-body').addEventListener('click', function() {
    ['chest', 'back', 'fshoulder', 'lshoulder', 'biceps', 'triceps', 'abs'].forEach(muscle => {
        document.querySelector(`input[name="muscles"][value="${muscle}"]`).checked = true;
    });
});

document.getElementById('lower-body').addEventListener('click', function() {
    ['quads', 'hamstrings'].forEach(muscle => {
        document.querySelector(`input[name="muscles"][value="${muscle}"]`).checked = true;
    });
});

document.getElementById('full-body').addEventListener('click', function() {
    ['quads', 'hamstrings', 'chest', 'back', 'fshoulder', 'lshoulder', 'biceps', 'triceps', 'abs'].forEach(muscle => {
        document.querySelector(`input[name="muscles"][value="${muscle}"]`).checked = true;
    });
});

document.getElementById('clear-muscles').addEventListener('click', function() {
    ['quads', 'hamstrings', 'chest', 'back', 'fshoulder', 'lshoulder', 'biceps', 'triceps', 'abs'].forEach(muscle => {
        document.querySelector(`input[name="muscles"][value="${muscle}"]`).checked = false;
    });
});

document.getElementById('workout-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const daysInWeek = Array.from(document.querySelectorAll('input[name="days"]:checked')).map(input => input.value);
    const priorityMuscles = Array.from(document.querySelectorAll('input[name="muscles"]:checked')).map(input => input.value);
    const preference = document.querySelector('input[name="preference"]:checked') ? document.querySelector('input[name="preference"]:checked').value : null;

    let missingCriteria = [];

    if(daysInWeek.length === 0) {
        missingCriteria.push("Days to train in a week");
    }
    if(priorityMuscles.length === 0) {
        missingCriteria.push("Training Focus");
    }
    if(!preference) {
        missingCriteria.push("Preference");
    }

    if(missingCriteria.length === 0) {
        const workoutPlan = generateWorkoutPlan(daysInWeek[0], priorityMuscles, preference);
        displayWorkoutPlan(workoutPlan);
        document.getElementById('error-message').innerHTML = ''; // Clear error message
    } else {
        document.getElementById('error-message').innerHTML = 'Please check at least 1 item in each criteria. Missing: ' + missingCriteria.join(", ");
    }
});


function generateWorkoutPlan(days, priorityMuscles, preference) {
    const allMuscles = {
        'quads': ['Barbell Squat', 'Leg Press', 'Leg Extension'],
        'hamstrings': ['Straight Leg Deadlift', 'Romanian Deadlift', 'Leg Curl'],
        'chest': ['Bench Press', 'Incline Bench Press', 'Weighted Dips', 'Cable Fly'],
        'back': ['Weighted Chin Up', 'Cable Row', 'Dumbbell Row', 'Lat Pull Down', 'Weighted Pull Up'],
        'fshoulder': ['Overhead Press', 'Dumbbell Shoulder Press', 'Front Dumbbell Raise'],
        'lshoulder': ['Dumbbell Lateral Raise', 'Dumbbell Rear Delt Fly', 'Cable Rope Face Pull', 'Cable Lateral Raise', 'Cable Rear Delt Fly',],    
        'biceps': ['Barbell Curl', 'Alternating Dumbbell Curl', 'Preacher Curl', 'Incline Curl', 'Hammer Curl'],
        'triceps': ['Tricep Rope Pushdown', 'Tricep Skullcrusher', 'Tricep Straight Bar Pushdown', 'Close-Grip Bench Press', 'Tricep Overhead Dumbbell Extension'],
        'abs': ['Hanging Leg Raise', 'Decline Sit Up', 'Cable Crunch', 'Hanging Knee Raise'],
    };

    let workoutPlan = {};

    let trainingDays = {
        3: ['Monday', 'Wednesday', 'Friday'],
        4: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
        5: ['Monday', 'Tuesday', 'Wednesday', 'Friday', 'Saturday'],
        6: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    };

    trainingDays[days].forEach((day) => workoutPlan[day] = []);

    const getVolume = (muscle, preference) => {
        const volumeSettings = {
            'high-volume': {
                'quads': '2-3 sets of 6-12 reps',
                'hamstrings': '2-3 sets of 6-12 reps',
                'chest': '2-3 sets of 6-12 reps',
                'back': '2-3 sets of 6-12 reps',
                'fshoulder': '3-4 sets of 8-15 reps',
                'lshoulder': '3-4 sets of 8-15 reps',
                'biceps': '3-4 sets of 8-15 reps',
                'triceps': '3-4 sets of 8-15 reps',
                'abs': '3-4 sets of 8-15 reps'
            },
            'high-intensity': {
                'quads': '1-2 sets to FAILURE (5+ reps minimum)',
                'hamstrings': '1-2 sets to FAILURE (5+ reps minimum)',
                'chest': '1-2 sets to FAILURE (5+ reps minimum)',
                'back': '1-2 sets to FAILURE (5+ reps minimum)',
                'fshoulder': '2-3 sets to FAILURE (8+ reps minimum)',
                'lshoulder': '2-3 sets to FAILURE (8+ reps minimum)',
                'biceps': '2-3 sets to FAILURE (8+ reps minimum)',
                'triceps': '2-3 sets to FAILURE (8+ reps minimum)',
                'abs': '2-3 sets to FAILURE (8+ reps minimum)'
            }
        };

        return volumeSettings[preference][muscle];
    };


    let counter = 0;
    Object.keys(allMuscles).forEach((muscle) => {
        const exercises = allMuscles[muscle];
        let numExercises;

        if (priorityMuscles.includes(muscle)) {
            //if designated as a priority muscle
            switch (muscle) {
                case 'chest':
                    numExercises = 4;
                    break;
                case 'back':
                    numExercises = 5;
                    break;
                case 'fshoulder':
                    numExercises = 3;
                    break;
                case 'lshoulder':
                    numExercises = 5;
                    break;
                case 'biceps':
                    numExercises = 5;
                    break;
                case 'triceps':
                    numExercises = 5;
                    break;
                case 'abs':
                    numExercises = 4;
                    break;
                case 'quads':
                    numExercises = 3;
                    break;
                case 'hamstrings':
                    numExercises = 3;
                    break;
                default:
                    numExercises = 3;
                    break;
            }
        } else {
            //if left default, not a priority muscle
            switch (muscle) {
                case 'chest':
                    numExercises = 1;
                    break;
                case 'back':
                    numExercises = 2;
                    break;
                case 'fshoulder':
                    numExercises = 2;
                    break;
                case 'lshoulder':
                    numExercises = 3;
                    break;
                case 'biceps':
                    numExercises = 3;
                    break;
                case 'triceps':
                    numExercises = 3;
                    break;
                case 'abs':
                    numExercises = 1;
                    break;
                case 'quads':
                    numExercises = 1;
                    break;
                case 'hamstrings':
                    numExercises = 1;
                    break;
                default:
                    numExercises = 1;
                    break;
            }
        }

        for(let i = 0; i < numExercises; i++) {
            let dayIndex = counter % trainingDays[days].length;
            workoutPlan[trainingDays[days][dayIndex]].push({
                exercise: exercises[i],
                volume: getVolume(muscle, preference)
            });
            counter++;
        }
    });


    Object.keys(workoutPlan).forEach(day => {
        workoutPlan[day].sort((a, b) => {
            const aIndex = Object.values(allMuscles).flat().indexOf(a.exercise);
            const bIndex = Object.values(allMuscles).flat().indexOf(b.exercise);
            return aIndex - bIndex;
        });
    });

    return workoutPlan;
}

function displayWorkoutPlan(workoutPlan) {
    const container = document.getElementById('workout-plan');
    container.innerHTML = '';

    Object.keys(workoutPlan).forEach(day => {
        const dayContainer = document.createElement('div');
        dayContainer.innerHTML = `<h2>${day}</h2>`;
        const dayWorkoutPlan = workoutPlan[day];

        dayWorkoutPlan.forEach(exercise => {
            const exerciseContainer = document.createElement('div');
            exerciseContainer.innerHTML = `<p>${exercise.exercise}: ${exercise.volume}</p>`;
            dayContainer.appendChild(exerciseContainer);
        });

        container.appendChild(dayContainer);
    });
}
