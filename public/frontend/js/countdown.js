var counter = {
  // (A) INITIALIZE COUNTDOWN TIMER
  instances : [],
  init : function (target, seconds, after) {
  //  target : ID of target HTML div
  //  seconds : seconds to countdown
  //  after : what to do after countdown end (function)

    // (A1) THIS INSTANCE
    let idx = counter.instances.length;
    counter.instances[idx] = {};
    let inst = counter.instances[idx];
    inst.remain = seconds;
    if (typeof after == "function") { inst.after = after; }

    // (A2) GENERATE HTML
    target = document.getElementById(target);
    target.classList.add("countdown");
    inst.wrap = target;
    let gensquare = function(txt){
      let square = document.createElement("div"),
          digits = document.createElement("div"),
          text = document.createElement("div"),
          ltxt = txt.toLowerCase();
      digits.innerHTML = "00";
      text.innerHTML = txt;
      square.classList.add("square");
      square.classList.add(ltxt);
      digits.classList.add("digits");
      text.classList.add("text");
      square.appendChild(digits);
      square.appendChild(text);
      inst[ltxt] = digits;
      return square;
    };
    target.innerHTML = "";
    if (seconds >= 86400) { target.appendChild(gensquare("DAYS")); }
    if (seconds >= 3600) { target.appendChild(gensquare("HOURS")); }
    if (seconds >= 60) { target.appendChild(gensquare("MINUTES")); }
    target.appendChild(gensquare("SECONDS"));

    // (A3) TIMER
    inst.timer = setInterval(function(){
      counter.tick(idx);
    }, 1000);
  },

  // (B) PROCEED WITH COUNTDOWN
  tick : function(idx){
  //  idx : target count down timer

    // (B1) TIMER STOP
    let inst = counter.instances[idx];
    inst.remain--;
    if (inst.remain <= 0 ) {
      clearInterval(inst.timer)
      inst.remain = 0;
    }

    // (B2) CALCULATE REMAINING TIME
    let secs = inst.remain;
    let days = Math.floor(secs / 86400); // 1 day = 60 secs * 60 mins * 24 hrs
    secs -= days * 86400;
    let hours = Math.floor(secs / 3600); // 1 hr = 60 secs * 60 mins
    secs -= hours * 3600;
    let mins  = Math.floor(secs / 60); // 1 min = 60 secs
    secs -= mins * 60;

    // (B3) UPDATE HTML
    inst.seconds.innerHTML = secs;
    if (inst.minutes !== undefined) { inst.minutes.innerHTML = mins; }
    if (inst.hours !== undefined) { inst.hours.innerHTML = hours; }
    if (inst.days !== undefined) { inst.days.innerHTML = days; }

    // (B4) AFTER TIMER END
    if (inst.remain == 0) {
      if (typeof inst.after == "function") { inst.after(idx); }
    }
  },

  // (C) HELPER - CONVERT DATE/TIME TO REMAINING SECONDS
  toSecs : function(yr, mth, day, hr, min, sec){
  // BEWARE - MONTH IS 0 to 11, JAN = 0 > DEC = 11

    let remain = Date.UTC(yr, mth, day, hr, min, sec);
    remain = Math.floor(remain / 1000);
    remain = remain - Math.floor(Date.now() / 1000);
    if (remain < 0) { remain = 0; }
    return remain;
  }
};