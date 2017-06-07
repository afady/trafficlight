(function() {
  "use strict";
  class Light {
    activate() {
      this.light.classList.add("active");
    }
    deactivate() {
      this.light.classList.remove("active");
    }
    constructor(light, lightLength) {
      this.light = light;
      this.lightLength = lightLength;
    }
  }

  class TrafficLight {
    currentLightIsTheLastLight() {
      return this.currentLightIndex >= this.lights.length - 1;
    }
    cycleLights(){
      this.currentLight.deactivate();

      if (this.currentLightIsTheLastLight()) {
        this.currentLightIndex = 0;
      } else {
        this.currentLightIndex++;
      }

      // update current light
      this.currentLight = this.lights[this.currentLightIndex];
      this.currentLightLength = this.currentLight.lightLength;

      this.currentLight.activate();
    }
    constructor(lights) {
      this.lights = lights;
      this.currentLightIndex = 0;
      this.currentLight = this.lights[this.currentLightIndex];
      this.currentLightLength = this.currentLight.lightLength;
    }
  }

  class TrafficLightScheduler {
    schedule(trafficLight) {
      let lightLength = trafficLight.currentLightLength;
      window.setTimeout(
        function() {
          trafficLight.cycleLights();
          this.schedule(trafficLight);
        }.bind(this),
        lightLength
      );
    }
  }

  let lightGo = new Light(document.getElementById("lightGo"), 4500);
  let lightWarn = new Light(document.getElementById("lightWarn"), 2250);
  let lightStop = new Light(document.getElementById("lightStop"), 4500);
  let lights = [lightGo, lightWarn, lightStop];
  let trafficLight = new TrafficLight(lights);
  new TrafficLightScheduler().schedule(trafficLight);
})();
