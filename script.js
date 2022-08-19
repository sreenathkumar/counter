// select dom elements
const counterEl = document.getElementById("counter");
const incEl = document.getElementById("increment");
const decEl = document.getElementById("decrement");
const counterArea = document.getElementById("counterArea");
const addCounter = document.getElementById("addCounter");
const resetCounter = document.getElementById("resetCounter");
const DeleteAll = document.getElementById("delete-all");

console.log();

// action identifiers
const INCREMENT = "increment";
const DECREMENT = "decrement";
const ADD_COUNTER = "addCounter";
const RESET_COUNTER = "resetCounter";
const DELETE_ALL = "deleteAll";

// action creators
const increment = (value, id) => {
  return {
    type: INCREMENT,
    payload: value,
    id: id,
  };
};

const decrement = (value, id) => {
  return {
    type: DECREMENT,
    payload: value,
    id: id,
  };
};

const addCounterDispatch = (id) => {
  return {
    type: ADD_COUNTER,
    payload: id,
  };
};

const resetCounterDispatch = () => {
  return {
    type: RESET_COUNTER,
  };
};

const DeleteAllDispatch = () => {
  return {
    type: DELETE_ALL,
  };
};

// initial state
const initialState = [
  {
    id: "counter",
    value: 0,
  },
];
// create reducer function
function counterReducer(state = initialState, action) {
  if (action.type === INCREMENT) {
    var updatedItem = state.map((item) => {
      if (item.id.toString() === action.id.toString()) {
        return {
          ...item,
          value: item.value + action.payload,
        };
      } else {
        return { ...item };
      }
    });
    return updatedItem;
  } else if (action.type === DECREMENT) {
    var updatedItem = state.map((item) => {
      if (item.id.toString() === action.id.toString()) {
        return {
          ...item,
          value: item.value - action.payload,
        };
      } else {
        return { ...item };
      }
    });
    return updatedItem;
  } else if (action.type === ADD_COUNTER) {
    return [
      ...state,
      {
        id: action.payload,
        value: 0,
      },
    ];
  } else if (action.type === RESET_COUNTER) {
    const resettedArray = state.map((item) => {
      return { ...item, value: 0 };
    });
    console.log(resettedArray);
    return resettedArray;
  } else {
    return initialState;
  }
}

// create store
const store = Redux.createStore(counterReducer);

// Increment dispatch function
const storeDispatchInc = (value) => {
  var id = event.target.getAttribute("data_code");
  store.dispatch(increment(3, id));
};
// Decrement dispatch function
const storeDispatchDec = () => {
  var id = event.target.getAttribute("data_code");
  store.dispatch(decrement(2, id));
};

//Updating the UI's dynamic value
const render = () => {
  const state = store.getState();
  state.map((item) => {
    console.log(item.id);
    var elementID = item.id.toString();
    var domElement = document.getElementById(elementID.toString());
    domElement.innerText = item.value;
  });
};

// update UI initially
render();

store.subscribe(render);

//AddCounter button action on click
addCounter.addEventListener("click", () => {
  let elementId = Date.now();
  {
    //CREATE ELEMENT
    var sectionContainer = document.createElement("DIV");
    var sectionMain = document.createElement("DIV");
    var counterSection = document.createElement("DIV");
    var btnContainer = document.createElement("DIV");
    var incrementBtn = document.createElement("BUTTON");
    var decrementBtn = document.createElement("BUTTON");

    //ADD CLASSES
    sectionContainer.classList.add(
      "mx-auto",
      "added-counter",
      "max-w-md",
      "mt-10",
      "space-y-5"
    );
    sectionMain.classList.add(
      "p-4",
      "h-auto",
      "flex",
      "flex-col",
      "items-center",
      "justify-center",
      "space-y-5",
      "bg-white",
      "rounded",
      "shadow"
    );
    counterSection.classList.add("text-2xl", "font-semibold");
    counterSection.setAttribute("id", elementId);
    btnContainer.classList.add("flex", "space-x-3");
    incrementBtn.classList.add(
      "bg-indigo-400",
      "text-white",
      "px-3",
      "py-2",
      "rounded",
      "shadow"
    );
    decrementBtn.classList.add(
      "bg-red-400",
      "text-white",
      "px-3",
      "py-2",
      "rounded",
      "shadow"
    );
    incrementBtn.setAttribute("onclick", "storeDispatchInc()");
    incrementBtn.setAttribute("data_code", elementId);

    decrementBtn.setAttribute("onclick", "storeDispatchDec()");
    decrementBtn.setAttribute("data_code", elementId);

    //insert Text
    counterSection.innerText = "0";
    incrementBtn.innerText = "increment";
    decrementBtn.innerText = "decrement";
    //append elements
    counterArea.appendChild(sectionContainer);
    sectionContainer.appendChild(sectionMain);
    sectionMain.appendChild(counterSection);
    sectionMain.appendChild(btnContainer);
    btnContainer.appendChild(incrementBtn);
    btnContainer.appendChild(decrementBtn);
  }
  store.dispatch(addCounterDispatch(elementId));
});

//DeleteAll button action on click
DeleteAll.addEventListener("click", () => {
  store.dispatch(DeleteAllDispatch());
  const addedCounters = document.querySelectorAll(".added-counter");
  addedCounters.forEach((element) => {
    element.remove();
  });
});

//ResetCounter button action on click
resetCounter.addEventListener("click", () => {
  store.dispatch(resetCounterDispatch());
  console.log(store.getState());
});
