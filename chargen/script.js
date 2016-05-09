var speciesList = {
    "human":"Human",
	"unathi":"Unathi",
	"tajara":"Tajara",
	"vox":"Vox Pariah",
	"resomi":"Resomi",
	"skrell":"Skrell",
	"diona":"Diona",
	"machine":"Machine"
};
var jobs = {
	"assistant":"Assistant",
	"captain":"Captain",
	"hop":"Head of Personnel",
	"bartender":"Bartender",
	"chef":"Chef",
	"gardener":"Gardener",
	"quartermaster":"Quartermaster",
	"cargotech":"Cargo Technician",
	"miner":"Shaft Miner",
	"janitor":"Janitor",
	"librarian":"Librarian",
	"iaa":"Internal Affairs Agent",
	"chaplain":"Chaplain",
	"ce":"Chief Engineer",
	"engineer":"Station Engineer",
	"atmos":"Atmospheric Technician",
	"cmo":"Chief Medical Officer",
	"doctor":"Medical Doctor",
	"chemist":"Chemist",
	"psychiatrist":"Psychiatrist",
	"paramedic":"Paramedic",
	"rd":"Research Director",
	"scientist":"Scientist",
	"xenobiologist":"Xenobiologist",
	"roboticist":"Roboticist",
	"hos":"Head of Security",
	"warden":"Warden",
	"detective":"Detective",
	"sec":"Security Officer",
	"ai":"AI",
	"cyborg":"Cyborg"
};
var cyborgModules = [
	"Standard",
	"Service",
	"Clerical",
	"Research",
	"Miner",
	"Crisis",
	"Surgeon",
	"Security",
	"Engineering",
	"Janitor"
];
// stolen from http://www.springhole.net/writing_roleplaying_randomators/character-flaws.htm
var flaws = [
    "has a drug addiction",
    "is afraid of a common animal",
    "is afraid of a common situation",
    "is allergic to a common thing",
    "is arrogant",
    "is bigoted",
    "is chronically ill",
    "is controlling",
    "is obsessive",
    "is egocentric",
    "is abusive",
    "is very sensitive",
    "is forgetful",
    "is greedy",
    "is impatient",
    "is lazy",
    "is judgmental",
    "is a chronic liar",
    "is moody",
    "is a drama queen",
    "is paranoid",
    "is petty",
    "is overly protective",
    "is power hungry",
    "is prejudiced",
    "is reckless",
    "is sadistic",
    "is selfish",
    "is short-sighted",
    "is hot headed",
    "is socially inept",
    "is spiteful",
    "is whiny"
];
// kinda stolen from http://www.springhole.net/writing_roleplaying_randomators/character-motivation.htm
var motives = [
    "marry someone who isn't interested",
    "kill someone who has hurt them in the past",
    "find a long lost friend",
    "learn the true fate of someone who suddenly left their life",
    "protect the people they love",
    "change their ways",
    "escape from someone who intends to hurt them",
    "fit in",
    "exact revenge",
    "move up in the world",
    "seek adventure",
    "keep justice",
    "be in charge of everything",
    "educate others",
    "solve a mystery about their past",
    "help those who need it",
    "fall in love",
    "get rich",
    "become famous",
    "earn the respect of their peers",
    "have children",
    "be attractive",
    "live in peace",
    "break an addiction or bad habit",
];
var speciesDOM = document.querySelector("fieldset[name='species']");
var jobsDOM = document.querySelector("fieldset[name='jobs']");
for(var species in speciesList) {
	var label = document.createElement("label");
	label.textContent = speciesList[species];
	speciesDOM.appendChild(label);
	var input = document.createElement("input");
	input.type = "checkbox";
	input.id = species;
	input.value = species;
	if(species == "human") {
		input.checked = "checked";
	}
	label.appendChild(input);
}
for(var job in jobs) {
	var label = document.createElement("label");
	label.textContent = jobs[job];
	jobsDOM.appendChild(label);
	var input = document.createElement("input");
	input.type = "checkbox";
	input.id = job;
	input.value = job;
	if(job == "assistant") {
		input.checked = "checked";
	}
	label.appendChild(input);
}
function getRandomInt(min, max) {
	  return Math.floor(Math.random() * (max - min)) + min;
}
function chargen() {
	var output = "";
	var selectedSpecies = speciesDOM.querySelectorAll("input:checked");
	var selectedJobs = jobsDOM.querySelectorAll("input:checked");
	if(!selectedSpecies.length || !selectedJobs.length) {
		output = "You must select at least one species and at least one job."
	} else {
		var species = selectedSpecies[getRandomInt(0, selectedSpecies.length)].id;
		var job = selectedJobs[getRandomInt(0, selectedJobs.length)].id;
		if(job == "ai") {
			output = "An AI";
		} else if(job == "cyborg") {
			var module = cyborgModules[getRandomInt(0, cyborgModules.length)];
			output = "A Cyborg with the " + module + " module";
		} else {
			output = "A(n) " + speciesList[species] + " " + jobs[job];
		}
		var flawAmt = getRandomInt(1, 4);
		var motiveAmt = getRandomInt(1, 4);
		output += " who " + flaws[getRandomInt(0, flaws.length)];
		while(flawAmt > 1) {
			output += ", and " + flaws[getRandomInt(0, flaws.length)];
			flawAmt--;
		}
		output += "; and who desperately wants to " + motives[getRandomInt(0, motives.length)];
		while(motiveAmt > 1) {
			output += ", and " + motives[getRandomInt(0, motives.length)];
			motiveAmt--;
		}
		output += "."
	}
	var outputDOM = document.getElementById("output");
	var p;
	if(outputDOM.firstChild)
		p = outputDOM.firstChild;
	else {
		p = document.createElement("p");
		outputDOM.appendChild(p);
	}
	p.textContent = output;
}