var boxes;
var r = 150;
var info = [];

var w = window.innerWidth; 
var h = window.innerHeight;

window.onresize = function() {

  w = window.innerWidth;
  h = window.innerHeight;
  resizeCanvas(w, h);
  create_boxes();
}

function create_boxes(){
  boxes = new Array(6);
  
  boxes[0] = new Box(w/3 -350 , h/2 + 200, 50);
  boxes[1] = new Box(w/3 -150 , h/2 + 200, 50);
  boxes[2] = new Box(w/3 +50, h/2 + 200, 50);
  boxes[3] = new Box(w/3 -350, h/2 +50, 50);
  boxes[4] = new Box(w/3 -150, h/2 +50 , 50);
  boxes[5] = new Box(w/3  +50, h/2 +50 , 50);
  add_information();
}

function setup() {
  createCanvas(w, h);
  textFont('Montserrat', 25);
  create_boxes();
}

function draw() {
  background('#57c0ab');

  var ok = 0;
  strokeWeight(3);
  draw_title();
  for(i = 0; i < boxes.length; ++i){
    boxes[i].update();
    boxes[i].show();
    ok|= boxes[i].on;
  }
  if(ok) cursor(HAND);
  else{
    show_info(info, 20, w*0.8, h/2 +140);
    cursor(ARROW);
  }

}

function draw_title(){

  fill('#57c0ab');
  stroke('#57c0ab')
  beginShape();
  for(i = 0; i < boxes.length; ++i){
    vertex(boxes[i].x, boxes[i].y);
  }
  endShape(CLOSE);

  strokeWeight(1);
  stroke(0);
  fill(0);
  textSize(50);
  text("Motion", w/2- textWidth('Motion')/2, 50);
  text("Planning", w/2 - textWidth('Planning')/2, 90);
  textSize(25);
  
  text("https://github.com/AdarshJaju154/ArbieGraphAlgo.git", w/2 - textWidth('https://github.com/AdarshJaju154/ArbieGraphAlgo.git')/2, 170);
  textSize(15);
  text("@ienitk", 5, 20);
}

function  mouseReleased(){
  for(var i = 0; i < boxes.length; ++i)
    if(boxes[i].clicked()) return;
}

function add_information(){

  info = split_info('Hi, here you will find interactive animations of some ' +
                    'main Graph Algorithms. Click in any of the nodes from the graph ' +
                    'in the left to try. For a better experience check this in a computer!');

  boxes[0].txt = ['DFS'];
  boxes[0].add_txt(w*0.8, h/2 +122.5,
                   'The Depth first search (DFS) is a Graph Traversal Algorithm. ' +
                   'It\'s aim is to traverse the graph in ' +
                   'such a way that it tries to go far from the root node.' ,
                   'dfs.html');


  boxes[1].txt = ['BFS'];
  boxes[1].add_txt(w*0.8, h/2 +122.5,
                   'The Breadth first search (BFS) is a Graph ' +
                   'Traversal Algorithm. It\'s aim is to traverse ' +
                   'the graph as close as possible to the root node.',
                   'bfs.html');


  boxes[2].txt = ['Dijkstra'];
  boxes[2].add_txt(w*0.8, h/2 +122.5,
                   'Dijkstra\'s algorithm is an algorithm for finding' +
                   ' the shortest paths between nodes in a graph. ' +
                   'For a given source node in the graph, the ' +
                   'algorithm finds the shortest path ' +
                   'between that node and every other.',
                   'dijkstra.html');


  boxes[3].txt = ['Kruskal'];
  boxes[3].add_txt(w*0.8, h/2 +122.5,
                   'Kruskal\s algorithm is a minimum-spanning-tree greedy '+
                   'algorithm which finds an edge of the least possible ' +
                   'weight that connects any two trees in the forest.',
                   'kruskal.html');

  boxes[4].txt = ['Bellman', 'Ford'];
  boxes[4].add_txt(w*0.8, h/2 +122.5,
                  'Bellman-Ford algorithm allows you to check whether ' +
                  'there exists a cycle of negative weight in the ' +
                  'graph, and if it does, find one of these cycles.',
                  'bford.html');

  

  boxes[5].txt = ['A*', 'Search'];
  boxes[5].add_txt(w*0.8, h/2 +122.5,
                  'A* is a graph traversal and path search informed algorithm. ' +
                  'In every step A* selects the path that minimizes a function ' +
                  'that works with a heuristic. ',
                  'astar.html');

}

function show_info(info, txt_sz, x, y){
  push();
  stroke(0);
  fill(0);
  textSize(txt_sz);
  strokeWeight(1);
  var space = info.length*txt_sz/2;
  for(var i = 0; i < info.length; ++i)
    text(info[i], x - textWidth(info[i])/2, y + i*txt_sz - space);
  pop();
}

function split_info(txt, width_txt=15){
  var aux = txt.split(' ');
  var line = '';
  var arr = [];

  for(var i = 0; i < aux.length; ++i){

    line+= aux[i] + " ";
    if(line.length >= width_txt){
      arr.push(line);
      line = '';
    }
  }

  if(line.length != 0) arr.push(line);

  return arr;

}
