function Unit(name){
    this.name = name
    this.health = 100
    this.enemies =[];
    
    Unit.prototype.calculateDamage = function(){

        this.damage = this.health/100;
        return this.damage;
    }
    Unit.prototype.calculateCritical = function(){

        this.critical = 10 - this.health/10
        return this.critical
    }
    Unit.prototype.fight = async function(targets){
        while(this.enemies.length > 0){
            
            if(this.health <=0)
                return
            for (let index = 0; index < this.enemies.length; index++) {
                const element = this.enemies[index];
                if(element.health <=0){
                    this.enemies.splice(index, 1)
                }
            }
           
            var x = Math.floor(Math.random()*this.enemies.length)

            //odradi deo za critical
            let dmg = this.calculateDamage()
            if(this.calculateCritical()>=Math.random()*100)
                dmg*=2

            let enemy = this.enemies[x]

            console.log(this.name + " with health "+ this.health + " dealth " + dmg + " to player " + enemy.name + " with health" + enemy.health)
            enemy.health -= dmg

            if(enemy.health <=0)
                this.enemies.splice(x, 1)
            

            //recharge 
            await this.recharging(this.health)
          
        }
    }
    Unit.prototype.recharging = (health) => new Promise(function(resolve) {
        setTimeout(function() {           
          resolve()           
        }, 1000*health/100);
      });
      
    
}


x = new Unit("SPIDERMAN")

y = new Unit("SUPERMAN")

z = new Unit("IRONMAN")

v  = new Unit("ANTMAN")

g  = new Unit("BATMAN");

x.enemies.push(y, z, v, g)
y.enemies.push(x, z, v, g)
z.enemies.push(x, y, v, g)
v.enemies.push(x, y, z, g)
g.enemies.push(x, y, z, v)

x.fight().then(()=> console.log(x.name, x.health <= 0 ? " IS DEAD***" : "WON"))
y.fight().then(()=> console.log(y.name, y.health <= 0  ? " IS DEAD***" : "WON"))
z.fight().then(()=> console.log(z.name, z.health <= 0  ? " IS DEAD***" : "WON"))
v.fight().then(()=> console.log(v.name, v.health <= 0  ? " IS DEAD***" : "WON"))
g.fight().then(()=> console.log(g.name, g.health <= 0  ? " IS DEAD***" : "WON"))




