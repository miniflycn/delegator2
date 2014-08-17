function Callback(callback) {
    callback = callback || function () {};
    this.proxy = function () {
        callback.apply(this, arguments);
    }
    this.set = function (cb) {
        callback = cb;
    }
}
var mindCallback = new Callback(),
    sendCallback = new Callback();
new Delegator('#container')
    .on('click', 'mind', mindCallback.proxy);

new Delegator('#container2')
    .on('click', 'send', sendCallback.proxy);

describe('delegator', function () {
    it('should delegate event', function (done) {
        mindCallback.set(function (e) {
            done();
        });
        document.getElementById('test1').click();
    });

    it('should send msg to handle', function (done) {
        $('#container2').html([
            '<ul>',
            '<li data-event-click="send" data-event-data="' + Delegator.set('hello') + '">',
            '<button id="test2"></button>',
            '</li>',
            '</ul>'
        ].join(''));
        sendCallback.set(function (e, data) {
            expect(data).to.equal('hello');
            done();
        });
        document.getElementById('test2').click();
    });

    it('should send data to handle', function (done) {
        var _data = {
            msg: 'hello'
        }
        $('#container2').html([
            '<ul>',
            '<li data-event-click="send" data-event-data="' + Delegator.set(_data) + '">',
            '<button id="test3"></button>',
            '</li>',
            '</ul>'
        ].join(''));
        sendCallback.set(function (e, data) {
            expect(data).to.equal(_data);
            done();
        });
        document.getElementById('test3').click();
    });

    it('should allow event bubbling', function (done) {
        var i = 0;
        mindCallback.set(function (e) {
            if (!i) {
                i++;
            } else {
                done();
            }
        });
        document.getElementById('test4').click();
    });

    it('should stop event propagation', function (done) {
        var i = 0;
        mindCallback.set(function (e) {
            if (!i) {
                i++;
                setTimeout(done, 0);
            } else {
                // it should not be call
                expect(false).to.be.a('string');
            }
        });
        document.getElementById('test5').click();
    });

});