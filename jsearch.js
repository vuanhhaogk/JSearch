const JSearch = {};

JSearch.Env = function(inp, out){
    this.inp = inp;
    this.out = out;

    this.inp.addEventListener('keydown', function(e){
        if (e.keyCode === 13)
            this.run(1);
    }.bind(this));

    this.inp.addEventListener('keyup', function(e){
        if (e.keyCode === 13){
            return;
        }

        this.run(0);
    }.bind(this));

    this.engines = [];

    return this;
}

JSearch.Env.prototype.run = function(mode){ // mode: [0: when keydown but not enter] [1: when enter]
    mode = mode in [0, 1, 2] ? mode : 2;

    for (var i = 0; i < this.engines.length; i++)
        if (this.engines[i].mode.indexOf(mode) !== -1){
            this.engines[i].handler.bind(this.engines[i])(this.inp.value, mode);
        }
}

JSearch.Env.prototype.add = function(cfg){
    var elm = document.createElement('div');
    this.out.appendChild(elm);
    this.engines.push({
        name: cfg.name || "unknown",
        handler: cfg.handler || function(){},
        pos: cfg.pos || this.engines.length + 1,
        mode: cfg.mode || [2],
        out: elm,
        html: function(html){
            this.out.innerHTML = html;
        }
    });
}
