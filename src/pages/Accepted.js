import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { Link } from 'react-router-dom';
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  ButtonDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Button
} from 'reactstrap';
import _ from 'lodash';
import $ from 'jquery';
const actionStyle = {background: 'none', border: 'none', boxShadow: 'none', lineHeight: 0, marginTop: -10}
const index = [0,1,2,3,4,5,6,7,8,9,10];

var clickcount = 0;
var products = [{
    name: "Mihai Petrea",
    clientdate: "01.03.2014",
    plan: "Basic Plan",
    daterequest: "28.08.2018",
    status: "Reviewed",
    operator: "Nantapat Tian",
    action: "Reviewed"
},
{
    name: "Mihai Petrea",
    clientdate: "01.03.2014",
    plan: "Basic Plan",
    daterequest: "28.08.2018",
    status: "Accepted",
    operator: "Nantapat Tian",
    action: "Accepted"
}
];

function pendingFormatter (cell, row)  {
    for(var i = 0; i < products.length; i++){
        if(products[i].status == 'Pending' && cell == 'Pending'){
            return '<div class="divColumn"><span class="spanColumn">'+ cell + '</span></div>';
        }else if (products[i].status == 'Reviewed' && cell == 'Reviewed'){
            return '<div class="reviewColumn"><span class="reviewedColumn">'+cell+'</span></div>';
        }else if (products[i].status == 'Accepted' && cell == 'Accepted'){
            return '<div class="acceptColumn"><span class="acceptedColumn">'+cell+'</span></div>';
        }
    }
    
  }
  
  function operatorFormatter (cell, row)  {
    return '<span class="AlignOperator">'+cell+'</span>'
  } 
  function actionFormatter(cell, row) {
    for(var i = 0; i < products.length; i++){
        if(products[i].action == 'Accepted' && cell == 'Accepted'){
            return '<a href="/request/1" class="clickOnce"> <Button class="colorAcceptedButtonAcceptedPage">'+cell+'</Button> </a>'
        }else if(products[i].action == 'Reviewed' && cell == 'Reviewed'){
            return '<a href="/request/1" class="clickOnce"> <Button class="colorReviewedButtonAcceptedPage">'+cell+'</Button> </a>'
        }
    }
    
  }
  

class Accepted extends Component {
    constructor(props){
        super(props);
    this.options = {
        defaultSortName: 'name',  // default sort column name
        defaultSortOrder: 'desc'  // default sort order
      };
    }
    componentWillUpdate = () => {
        
    }
    componentDidMount = () => {
        $("table").removeClass('table-bordered');
        $("table").addClass('requestMain');
        $(".table-hover.requestMain").css({
            borderSpacing: '0px 0px',
        })
        $("tbody").addClass('requestMainTbody');
        $(".table-hover").css({
            position: 'relative',
            top: '11px',
        })
        $("td:nth-child(1)").css({
            width: '198px'
        })
        $("td:nth-child(2)").css({
            width: '182px'
        })
        $("td:nth-child(3)").css({
            width: '200px'
        })
        $("td:nth-child(4)").css({
            width: '175px'
        })
        $("td:nth-child(6)").css({
            width: '145px',
           
        })
        $("th:nth-child(3)").css({
            position: 'relative',
            left: '20px'
        })
        $("th:nth-child(4)").css({
            position: 'relative',
            left: '32px'
        })
        $("th:nth-child(5)").css({
            position: 'relative',
            left: '16px'
        })
        $("th:nth-child(6)").css({
            position: 'relative',
            left: '20px'
        })
        $("th:nth-child(7)").css({
            position: 'relative',
            left: '20px'
        })
        $(".caret").addClass("fas fa-caret-down");
        $("span.dropdown").css({
            paddingLeft: "10px",
        })
        $("#pageDropDown").css({
            backgroundColor: "#ffffff"
        })
      
        $(".colorAcceptButton").one("click", function(e){
            e.preventDefault();
          var index = $(".colorAcceptButton").index(this);
          $( this  ).html('Open');
          $(this ).css({
            width : "74.8px",
            backgroundColor: "#29572a",
            color: "#ffffff",
            outline: "none"
          })
          $(".textOperator").eq(index).text("Nannapas");
         });
      console.log($('td:contains("")'));
       
        
        
       
       

        
    }
    
    render() {
        const options = {
            page: 1,  // which page you want to show as default
            sizePerPageList: [ {
              text: '5', value: 5
            }, {
              text: '10', value: 10
            }, {
              text: 'All', value: products.length
            } ],
            sizePerPage: 5,  // which size per page you want to locate as default
            pageStartIndex: 1, // where to start counting the pages
            paginationSize: 3,  // the pagination bar size.
            prePage: 'Prev', // Previous page button text
            nextPage: 'Next', // Next page button text
            firstPage: 'First', // First page button text
            lastPage: 'Last', // Last page button text
            paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
            paginationPosition: 'bottom'  // default is bottom, top and both is all available
           
          };
        return(
            <div className="animated fadeIn">
           
        <Row>
         <Col md="12" xs="12">
          <p className="alignRequest">Requests</p>
         </Col>
       </Row>
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardBody>
              <BootstrapTable  data={products} version='4' className="requestMain" pagination={true} options={options} id="myTable" >
                <TableHeaderColumn dataField='name' isKey={ true } >CUSTOMER NAME</TableHeaderColumn>
                <TableHeaderColumn dataField='clientdate' >CLIENT SINCE</TableHeaderColumn>
                <TableHeaderColumn dataField='plan' dataSort={ true }>ACTIVE PLAN</TableHeaderColumn>
                <TableHeaderColumn dataField='daterequest' dataSort={ true }>DATE REQUESTED</TableHeaderColumn>
                <TableHeaderColumn dataField='status' dataFormat={pendingFormatter} >STATUS</TableHeaderColumn>
                <TableHeaderColumn dataField='operator' dataFormat={operatorFormatter}>OPERATOR</TableHeaderColumn>
                <TableHeaderColumn dataField='action' dataFormat={actionFormatter} >ACTIONS</TableHeaderColumn>

             </BootstrapTable>
              </CardBody>
            </Card>
          </Col>
        </Row>
      
      </div>
        );
    }
}
export default Accepted;
