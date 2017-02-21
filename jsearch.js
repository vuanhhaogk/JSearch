const JSearch = {};

JSearch.Env = function(inp, out){
    this.inp = inp;
    this.out = out;

    this.inp.className = (this.inp.className.length > 0 ? this.inp.className + ' ' : '') + 'jser-input';
    this.out.className = (this.out.className.length > 0 ? this.out.className + ' ' : '') + 'jser-output';

    this.inp.addEventListener('keydown', function(e){
        if (e.keyCode !== 13)
            return;

        this.run(2);
    }.bind(this));

    this.inp.addEventListener('keyup', function(e){
        if (e.keyCode === 13)
            return;

        this.run(1);
    }.bind(this));

    this.engines = [];
}

JSearch.Env.prototype.add = function(cfg){
    cfg.pos = cfg.pos || this.engines.length + 1000;

    var elm = document.createElement('div');

    elm.className = 'jser-out-item';
    elm.setAttribute('pos', cfg.pos);

    var items = this.out.children;

    var i = items.length - 1
    while (i > 0 && parseInt(items[i].getAttribute('pos')) > cfg.pos)
        i--;

    this.out.insertBefore(elm, items[i]);

    this.engines.push({
        name: cfg.name || 'unknown',
        pos: cfg.pos,
        handler: cfg.handler || function(){},
        mode: cfg.mode || [2],
        out: elm,
        html: function(html){
            this.out.innerHTML = html;
        },
        attr: function(name, value){
            if (!value)
                return this.out.getAttribute(name);

            this.out.setAttribute(name, value);
            return value;
        }
    });
}

JSearch.Env.prototype.run = function(mode){
    mode = mode || 2;

    for (var i = 0; i < this.engines.length; i++)
        if (this.engines[i].mode.indexOf(mode) !== -1)
            this.engines[i].handler.bind(this.engines[i])(this.inp.value, mode);
        else
            this.engines[i].html('');
}
