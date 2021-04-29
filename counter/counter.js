// Example using class
class Counter {
  count = 0;
  min = 0;
  max = 10;
  subIsDisabled = true;
  addIsDisabled = false;

  add(){
    if (this.count< this.max){
      this.count++;
    }
  }

  subtract(){
    if (this.count > this.min){
      this.count--;
    }
  }

  view(){
    return [
      <button hx-post="/counter/sub" hx-target="#container" disabled={this.count === this.min}>-</button>,
      <span>{this.count}</span>,
      <button hx-post="/counter/add" hx-target="#container" disabled={this.count === this.max}>+</button>
    ];
  }
}

export default new Counter();