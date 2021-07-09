class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let count = 0;
    let currentVamp = this;
    while (currentVamp.creator) {
      currentVamp = currentVamp.creator;
      count += 1;
    }
    return count;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.

  numberOfVampiresFromInput(input) {
    let count = 0;
    let currentVamp = this;
    while (currentVamp.creator && currentVamp.creator !== input) {
      currentVamp = currentVamp.creator;
      count += 1;
    }
    return count;
  }


  closestCommonAncestor(vampire) {
    if (vampire === this) {
      return this;
    }

    const thisArr = [];
    let currentThisVamp = this;
    while (currentThisVamp.creator) {
      currentThisVamp = currentThisVamp.creator;
      thisArr.push(currentThisVamp);
    }
    if (thisArr.length === 0) {
      thisArr[0] = currentThisVamp;
    }

    const vampArr = [];
    let currentVamp = vampire;
    while (currentVamp.creator) {
      currentVamp = currentVamp.creator;
      vampArr.push(currentVamp);
    }
    if (vampArr.length === 0) {
      vampArr[0] = currentVamp;
    }
    console.log('thisArr: ', thisArr);
    console.log('vampArr: ', vampArr);
    
    // iterate over each array and find common keys
    const commonAncestors = [];
    for (const firstVampObj of thisArr) {
      for (const secondVampObj of vampArr) {
        if (firstVampObj.name === secondVampObj.name) {
          commonAncestors.push(firstVampObj);
        }
      }
    }
    return commonAncestors[0];
  }
}

module.exports = Vampire;
