class StateMachine {
    constructor(config) {
        // Assign the initial state of state machine
        let _state = config.init;

        extend(this, config.methods);

        config.transitions.forEach((transition) => {
            this[transition.name] = () => {
                if(_state === transition.from) {
                    if(this['on' + toTitleCase(transition.name)]){
                        this['on' + toTitleCase(transition.name)]();
                    }
                    _state = transition.to;
                }
            }
        });

        function extend(obj, src) {
            for(const key in src) {
                if(src.hasOwnProperty(key)) obj[key] = src[key];
            }
            return obj;
        }

        function toTitleCase(str) {
            return str.replace(
                /\w\S*/g,
                function(txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                }
            );
        }

    }
    
}

var fsm = new StateMachine({
    init: 'solid',
    transitions: [
      { name: 'melt',     from: 'solid',  to: 'liquid' },
      { name: 'freeze',   from: 'liquid', to: 'solid'  },
      { name: 'vaporize', from: 'liquid', to: 'gas'    },
      { name: 'condense', from: 'gas',    to: 'liquid' }
    ],
    methods: {
      onMelt:     function() { console.log('I melted')    },
      onFreeze:   function() { console.log('I froze')     },
      onVaporize: function() { console.log('I vaporized') },
      onCondense: function() { console.log('I condensed') }
    }
  });

  fsm.melt();
  fsm.freeze();
  fsm.vaporize();
  fsm.condense();
  console.log(fsm.state);