// ga specific functions


function calculateFitness() {
  var currentRecord = Infinity;
  for (var i = 0; i < population.length; i++) {
    var d = calcDistance(cities, population[i]);

    if (d < recordDistance) {
      recordDistance = d;
      bestPath = population[i];
    }
    if (d < currentRecord) {
      currentRecord = d;
      currentBest = population[i];
    }
    let mejora = floor((d - recordDistance) / recordDistance * 100);
    fitness[i] = 1 / (d + 1);
  }
}
// para transformarlos en probabilidaes
function normallizeFitness() {
  var sum = 0;
  for (var i = 0; i < fitness.length; i++) {
    sum += fitness[i];
  }
  for (var i = 0; i < fitness.length; i++) {
    fitness[i] = fitness[i] / sum;
  }

}

function nextGeneration() {
  var newPopulation = [];
  for (var i = 0; i < population.length; i++) {
    var orderA = pickOne(population, fitness);
    var orderB = pickOne(population, fitness);
    var order = crossOver(orderA, orderB);
    mutate(order, 0.05);
    newPopulation[i] = order;
  }
  population = newPopulation;

}

// busca en la lista 
function pickOne(list, probabilities) {
  var index = 0;
  var r = random(1);
  while (r > 0) {
    r = r - probabilities[index];
    index++
  }
  index--;
  return list[index].slice(); // retorna una copia del array
}

function crossOver(orderA, orderB) {
  var start = floor(random(orderA.length)); // random spot
  var end = floor(random(start + 1, orderA.length));
  var newOrder = orderA.slice(start, end);
  //var left = totalCities - newOrder.length; // cuantas ciudades quedan
  for (var i = 0; i < orderB.length; i++) {
    var city = orderB[i];
    if (!newOrder.includes(city)) {
      newOrder.push(city);
    }
  }
return newOrder
}

function mutate(order, mutationRate) {
  // genera un cambio en el orden original de las ciudades
  for (var i = 0; i < totalCities; i++) {

    if (random(1) < mutationRate) {
      var indexA = floor(random(order.length));
      var indexB = (indexA +1)%totalCities;//cambia 2 ciudades vecinas;
      swap(order, indexA, indexB);
    }
  }
}