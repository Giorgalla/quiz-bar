import fs from 'node:fs';
import {questions as original} from './original-questions.js';
const root=new URL('.',import.meta.url),read=f=>fs.readFileSync(new URL(f,root),'utf8').trim().split('\n').map(l=>l.split('|'));
let seed=92843;function rand(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;}
function shuffle(a){return [...a].sort(()=>rand()-.5);}
const bank=[...original],seen=new Set(original.map(q=>q.q.toLowerCase().replace(/[^\p{L}\p{N}+×−÷]/gu,'')));
function add(category,q,right,pool,f){right=String(right);const key=q.toLowerCase().replace(/[^\p{L}\p{N}+×−÷]/gu,'');if(seen.has(key))return;const wrong=shuffle([...new Set(pool.map(String))].filter(s=>s.toLowerCase()!==right.toLowerCase())).slice(0,3);if(wrong.length!==3)throw Error('Too few choices: '+q);const o=shuffle([right,...wrong]);bank.push({category,q,o,a:o.indexOf(right),f,round:'House quiz'});seen.add(key);}
const decade=y=>Math.floor(Number(y)/10)*10+'s';
const countries=read('geography.txt');
for(const [country,capital,currency,continent]of countries){
 const f=`${capital} is ${country==='Switzerland'?'the federal city of Switzerland':`the capital of ${country}`}. ${country} is in ${continent}, and its currency is the ${currency}. A capital is a centre of government; it is not necessarily the country's largest city.`;
 add('Geography',country==='Switzerland'?'Which city is Switzerland’s federal city?':`What is the capital of ${country}?`,capital,countries.map(r=>r[1]),f);
 add('Geography',`Which country has ${capital} as its ${country==='Switzerland'?'federal city':'capital'}?`,country,countries.map(r=>r[0]),f);
 add('Geography',`Which currency is used in ${country}?`,currency,countries.map(r=>r[2]),f);
 add('Geography',`On which continent is ${capital}, ${country}?`,continent,['Europe','Asia','Africa','North America','South America','Oceania'],f);
}
const elements=read('elements.txt');
for(const [name,symbol,z] of elements){const f=`${name} has the symbol ${symbol} and atomic number ${z}. That means every ${name.toLowerCase()} atom has ${z} protons in its nucleus. A neutral atom also has ${z} electrons; changing the neutron count creates an isotope rather than a different element.`;
 add('Science',`What is the chemical symbol for ${name.toLowerCase()}?`,symbol,elements.map(r=>r[1]),f);
 add('Science',`Which chemical element has the symbol ${symbol}?`,name,elements.map(r=>r[0]),f);
 add('Science',`How many protons are in the nucleus of a ${name.toLowerCase()} atom?`,z,elements.map(r=>r[2]),f);
}
const films=read('films.txt');
for(const [title,director,year] of films){const others=films.filter(r=>r[1]===director&&r[0]!==title).slice(0,2).map(r=>r[0]);const f=`${title} was directed by ${director} and first released in ${year}. The director guides the film's creative interpretation and the performances on screen.${others.length?` Other films credited to ${director} include ${others.join(' and ')}.`:''}`;
 add('Movies',`Who directed the ${year} film “${title}”?`,director,films.map(r=>r[1]),f);
 add('Movies',`In which decade was ${director}’s “${title}” first released?`,decade(year),['1950s','1960s','1970s','1980s','1990s','2000s','2010s','2020s'],f);
}
const books=read('books.txt');
for(const [title,author,year]of books){const others=books.filter(r=>r[1]===author&&r[0]!==title).slice(0,2).map(r=>r[0]);const f=`${title} was written by ${author} and first appeared in the ${decade(year)}. Some classic books appeared in instalments before being collected into one volume, so publication histories can include more than one date.${others.length?` You may also know ${author} for ${others.join(' and ')}.`:''}`;
 add('Literature',`Who wrote “${title}”?`,author,books.map(r=>r[1]),f);
 add('Literature',`In which decade did “${title}” by ${author} first appear?`,decade(year),books.map(r=>decade(r[2])),f);
}
const music=read('music.txt');
for(const [song,artist,era]of music){const others=music.filter(r=>r[1]===artist&&r[0]!==song).slice(0,2).map(r=>r[0]);const f=`${artist} released the recording of ${song} in the ${era}. A song's recording artist and its songwriter are not always the same person.${others.length?` Other well-known recordings by ${artist} include ${others.join(' and ')}.`:''}`;
 add('Music',`Which artist or group released “${song}” in the ${era}?`,artist,music.map(r=>r[1]),f);
 add('Music',`In which decade did ${artist} first release “${song}”?`,era,['1960s','1970s','1980s','1990s','2000s','2010s','2020s'],f);
}
const food=read('food.txt');
for(const [dish,ingredient,origin,note]of food){const f=`${dish} is associated with ${origin} and features ${ingredient.toLowerCase()}. ${note} Recipes can vary between regions and households.`;
 add('Food',`Which ingredient or base is characteristic of ${dish}?`,ingredient,food.filter(r=>!r[1].toLowerCase().split(/\W+/).some(t=>t.length>3&&ingredient.toLowerCase().includes(t))).map(r=>r[1]),f);
 // Notes specify the named preparation rather than asserting a single disputed birthplace.
 const neighbours = origin.includes('Africa')||['Ghana','Ethiopia','South Africa'].includes(origin)?['Japan','Italy','Peru']:['Japan','China','South Korea','Vietnam','Thailand','Indonesia','India','South Asia'].includes(origin)?['France','Mexico','Ethiopia']:['Middle East','Levant','Greece'].includes(origin)?['Japan','Brazil','Canada']:['United States','Canada','Mexico','Latin America','Venezuela and Colombia','Brazil','Peru','Argentina and Uruguay'].includes(origin)?['Japan','Hungary','Ethiopia']:['Australia','Australia and New Zealand'].includes(origin)?['Italy','Ghana','Japan']:['Japan','Peru','Ghana'];
 add('Food',`Which cuisine or region is ${dish} especially associated with?`,origin,neighbours,f);
}
const animals=read('animals.txt');const traits={Mammal:'Mammals feed their young with milk. Most give birth to live young, but monotremes such as the platypus lay eggs.',Bird:'Birds have feathers and lay eggs. Feathers are a more reliable identifying feature than the ability to fly, because some birds are flightless.',Reptile:'Reptiles generally have dry, scaly skin and breathe air with lungs. Most rely heavily on external heat sources to regulate body temperature.'};const diets={Herbivore:'Its usual food comes mainly from plants. Herbivore describes a feeding pattern, not a taxonomic group.',Carnivore:'Its usual food is mainly other animals. Insects and fish count as animal food, just as larger prey do.',Omnivore:'It regularly eats both plant and animal material. The balance can change with season and food availability.'};
for(const [animal,group,diet]of animals){const f=`The ${animal.toLowerCase()} is a ${group.toLowerCase()} and is usually classed as a ${diet.toLowerCase()} by diet. ${traits[group]} ${diets[diet]} These diet labels describe typical feeding, not a claim that no exceptions ever occur.`;
 add('Animals',`Which broad animal group includes the ${animal.toLowerCase()}?`,group,['Mammal','Bird','Reptile','Amphibian','Insect','Fish'],f);
 add('Animals',`Which term best describes the usual diet of the ${animal.toLowerCase()}?`,diet,['Herbivore','Carnivore','Omnivore','Detritivore'],f);
}
const olympics=read('olympics.txt');const historical=new Set(['West Germany','Soviet Union','Yugoslavia']);
for(const [season,year,city,country]of olympics){let f=`${city} was the main host city of the ${year} ${season} Olympics, in ${country}. ${season==='Winter'?'The Winter Games feature sports contested on snow or ice.':'The Summer Games bring together many sports, including athletics and swimming.'}`;if(year==='2020')f+=' The Tokyo 2020 Games were held in 2021 after a postponement.';if(year==='1956'&&season==='Summer')f+=' Equestrian events were held separately in Stockholm because of Australian quarantine restrictions.';if(historical.has(country))f+=' The country name here is the name used at the time of those Games.';
 add('Sport',`Which city was the main host of the ${year} ${season} Olympics?`,city,olympics.filter(r=>r[0]===season).map(r=>r[2]),f);
 add('Sport',`In which country were the ${year} ${season} Olympics mainly held?`,country,olympics.map(r=>r[3]),f);
 const same=olympics.filter(r=>r[0]===season&&r[2]===city).map(r=>r[1]);
 add('Sport',`Which of these years saw ${city} host the ${season} Olympics?`,year,olympics.filter(r=>r[0]===season&&!same.includes(r[1])).map(r=>r[1]),f);
}
const sport=read('sport-clues.txt');for(const [q,a,f]of sport)add('Sport',q,a,sport.map(r=>r[1]),f);
// Original arithmetic questions, with workings rather than just answer restatements.
for(let i=1;i<=25;i++){
 const a=i+7,b=i%9+2,near=x=>[x-3,x-2,x-1,x+1,x+2,x+3];
 add('Numbers',`What is ${a} + ${b}?`,a+b,near(a+b),`Adding ${b} to ${a} gives ${a+b}. Addition combines quantities; you can check this by subtracting ${b} from the result to get ${a} again.`);
 add('Numbers',`What is ${a*3} − ${b}?`,a*3-b,near(a*3-b),`Subtract ${b} from ${a*3} to obtain ${a*3-b}. Subtraction is the inverse of addition: ${a*3-b} + ${b} = ${a*3}.`);
 add('Numbers',`What is ${a} × ${b}?`,a*b,near(a*b),`${a} groups of ${b} make ${a*b}. Multiplication represents repeated addition; dividing ${a*b} by ${b} returns ${a}.`);
 add('Numbers',`What is ${a*b} ÷ ${b}?`,a,near(a),`${a*b} divided into ${b} equal groups gives ${a} in each group. Check by multiplying ${a} × ${b} = ${a*b}.`);
 add('Numbers',`What is the square of ${a}?`,a*a,near(a*a),`Squaring a number means multiplying it by itself. Here, ${a} × ${a} = ${a*a}; it does not mean multiplying ${a} by two.`);
 add('Numbers',`What is 25% of ${a*4}?`,a,near(a),`25% means one quarter. Divide ${a*4} by 4 to get ${a}; equivalently, multiply by 0.25.`);
 add('Numbers',`What is the perimeter of a rectangle with sides ${a} cm and ${b} cm?`,2*(a+b),near(2*(a+b)),`A rectangle has two sides of each length. Add all four: ${a} + ${b} + ${a} + ${b} = ${2*(a+b)} cm. Perimeter measures the distance around the edge.`);
 add('Numbers',`What is the area, in square centimetres, of a rectangle ${a} cm long and ${b} cm wide?`,a*b,near(a*b),`Rectangle area is length × width: ${a} × ${b} = ${a*b} cm². Area counts surface coverage, so its units are squared, unlike the units for perimeter.`);
 add('Numbers',`What is the mean of ${a-2}, ${a}, and ${a+2}?`,a,near(a),`Add the numbers to get ${3*a}, then divide by three to obtain ${a}. Because these three values are equally spaced, the middle value is also their mean.`);
 add('Numbers',`What comes next: ${a}, ${a+b}, ${a+2*b}, ${a+3*b}, … if the same amount is added each time?`,a+4*b,near(a+4*b),`Each step adds ${b}. Adding ${b} to ${a+3*b} gives ${a+4*b}. A sequence with a constant difference between neighbouring terms is an arithmetic sequence.`);
}
add('Food','Which nut is traditionally ground to make marzipan?','Almond',['Walnut','Hazelnut','Cashew'],'Marzipan is a sweet paste traditionally made from ground almonds and sugar. It can be shaped into decorations or used in confectionery. Almond flavour distinguishes it from sugar-only modelling pastes such as fondant.');
add('Food','Which seeds are ground to make tahini?','Sesame',['Sunflower','Pumpkin','Poppy'],'Tahini is a paste made from ground sesame seeds. It is used in foods such as hummus and can also be thinned with lemon juice and water to make a sauce. Versions made with hulled or unhulled seeds differ in flavour and texture.');
add('Art','Who created the sculpture The Thinker?','Auguste Rodin',['Claude Monet','Pablo Picasso','Salvador Dalí'],'Auguste Rodin created The Thinker, a seated figure in a pose of intense contemplation. The figure was originally conceived as part of his larger project The Gates of Hell. Sculpture uses three-dimensional form rather than a flat painted surface.');
add('Art','Which artist painted the gold-toned painting The Kiss, completed in the early twentieth century?','Gustav Klimt',['Claude Monet','Edvard Munch','Henri Matisse'],'Gustav Klimt painted The Kiss, showing a couple embracing amid richly patterned decoration. The work is associated with his Golden Period, when gold leaf played a prominent role. It is a painting, distinct from Rodin’s sculpture also titled The Kiss.');
const map={'Geography':'geography','Around the world':'geography','Science':'science','Space':'science','Animals':'nature','Nature':'nature','Food':'food','Food & drink':'food','Movies':'screen','Television':'screen','Music':'music','Sport':'sport','Literature':'arts','Art':'arts','Numbers':'general','General knowledge':'general'};
const counts={};for(const q of bank)counts[map[q.category]]=(counts[map[q.category]]||0)+1;
console.log(counts,'TOTAL',bank.length);
for(const [k,n]of Object.entries(counts))if(n<200)throw Error(k+' too small');
fs.writeFileSync(new URL('../questions.js',root),'// Expanded, bundled question bank. See UPDATE-INSTRUCTIONS.txt for scope and sources.\nexport const questions = '+JSON.stringify(bank,null,2)+';\n');
fs.writeFileSync(new URL('counts.json',root),JSON.stringify(counts,null,2));
