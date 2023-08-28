import React, {Component} from 'react';
import CanvasSvg from "./canvasSVG";
import { getTree} from "./fib";

import * as d3 from 'd3'
import "./graph.css"

class Graph extends Component {
    
    constructor() {
        super();
        this.state = {
            root:undefined,
            vertices:[],
            edges:[],
            current:-1,
            // n:5,
            n:Math.floor(Math.random() * (5 - 2 + 1)) + 2,
            r:2,
            algo:0,
            offset:0,
            i:0,
        }
    }


    
    componentDidMount() {
        if (this.props.shouldAddNumber) {
            this.addNumber();

            
            
            
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.shouldAddNumber !== prevProps.shouldAddNumber && this.props.shouldAddNumber) {
            // while(1){

                this.addNumber();
            // }
        }
    }


    clearCanvas = () => {
        const svg = d3.select(".myCanvas");
        console.log(svg);
        svg.selectAll('*').remove();
      };
    
    
    addNumber = ()=>{
        // console.log(getFibTree(3));
        let tree = getTree(this.state.n,this.state.algo,this.state.r);
        this.setState({edges:[],vertices:[],offset:tree.x});
        this.state.vertices = [];
        // this.setState({});
        this.recur(tree,undefined);

    }
    recur = async (node,parent)=>{
        // if(this.state.n === 5 && this.state.i <=2){
        //     console.log(this.state.n," ",this.state.i);
        //     this.state.i++;
        // }else{
        //     console.log(this.state.n," = ",this.state.i);
        //     this.clearCanvas();
        //     // this.addNumber();
        // }

        let vertices = this.state.vertices;
        let current = this.state.vertices.length;

        


        if( parent!==undefined ){
            if( node.children.length )
                vertices.push({label:node.tree.label,val:0,x:node.x,y:node.y,px:parent.x,py:parent.y});
            else
                vertices.push({label:node.tree.label,val:node.tree.node,x:node.x,y:node.y,px:parent.x,py:parent.y});
            this.setState({vertices,current});



            let edges = this.state.edges;
            edges.push({
                x1:parent.x,
                y1:parent.y,
                x2:node.x,
                y2:node.y
            });
            this.setState({edges});
        }else{
            if( node.children.length )
                vertices.push({label:node.tree.label,val:0,x:node.x,y:node.y,px:node.x,py:node.y});
            else
                vertices.push({label:node.tree.label,val:node.tree.node,x:node.x,y:node.y,px:node.x,py:node.y});
            this.setState({vertices,current});
        }
        await sleep(500);


        for(let i=0;i<node.children.length;i++){
            await this.recur( node.children[i],node );
            // let verticess = [...this.state.vertices];
            // verticess[current].val+=node.children[i].tree.node;
            this.setState({current});
            await sleep(500);
        }
        let verticess = [...this.state.vertices];
        verticess[current].val=node.tree.node;
        this.setState({vertices:verticess});

        // console.log("hhhhh ",current," ",this.state.i )  
        if (current === 0){
            setTimeout(()=>{
                // this.clearCanvas();
                this.addNumber();

            },1000)
        } 

    }


    
    render() {
        return (
            <div className="Loader" >
        
                <CanvasSvg
                    vertices={this.state.vertices}
                    edges={this.state.edges}
                    current={this.state.current}
                    offset={this.state.offset}
                />
                {/* <h1 className='loaderh1'>Loading....</h1> */}
            </div>
        );
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export default Graph;