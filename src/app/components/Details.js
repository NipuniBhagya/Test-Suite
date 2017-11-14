import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import axios from 'axios';
import qs from 'qs';
import jwt_decode from 'jwt-decode';
import Highlight from 'react-highlight';


export class Details extends React.Component {



    constructor(props){
        super();
        this.state= {
            client_key:"",
            grantType: "",
            code: "",
            callback: "",
            acTokenEndpoint: "",
            secret: "",

            res_header: {},

            tokenSplit: "",

            idEn: {},
            header_decoded:"",
            body_decoded:"",
            sig_decoded: "",


            id_token: [],
            id_encoded: "",
            id_decoded: "",
            id_header: {},
            id_body: {},
            id_signature: "",

            isLoaded: false,
            res_data: [],

            status: "",
            status_Text: "",
            config: {},
            resultState: "",
            summary: "",


        };

    }

    handleAuthCodeChanged (event){
        this.setState({code: event.target.value});
    }

    handleCallbackChanged(event) {
        this.setState({callback: event.target.value});
    }

    handleAccTokenChanged(event) {
        this.setState({acTokenEndpoint: event.target.value});
    }

    handleClientKeyChanged(event) {
        this.setState({client_key: event.target.value});
    }

    handleSecretChanged(event) {
        this.setState({secret: event.target.value});
    }

    validateResponse = (response) => {

        let status = this.state.status;
        let status_Text = this.state.status_Text;
        let resultState = this.state.resultState;
        let summary = this.state.summary;


        status = response.status;
        this.setState({status})

        status_Text = response.statusText;
        this.setState({status_Text})

        if (response.data.id_token !== null){
            resultState = <h4><span className="label label-success">Success!</span></h4>;
            this.setState({resultState})

            summary = 'Response status: {status} {status_Text}<br/>Authorization: Basic<br/>Scope: Openid';
            this.setState({summary})
        };



    }

    handleError = (error) => {
        let resultState = this.state.resultState;
        let summary = this.state.summary;

        if (error !== null) {
            resultState = <h4><span className="label label-danger">Failed!</span></h4>;
            this.setState({resultState})

            summary = error;
            this.setState({summary})

        };
    }



    handleFormSubmit = (e) => {

        e.preventDefault();
        let code = this.state.code;
        let callback = 'http://localhost:8080/oauth2client';
        // let acTokenEndpoint = this.state.acTokenEndpoint;
        let secret = '7JjRP8Xd1Q_IUoY3_SrtQnJtzaoa';
        let key = 'skBVN3tJIdjBtnILq_bx_a_fxEEa';

        var string = key + ':' + secret;
        let encoded = btoa(string);

        this.setState({isLoaded: true});

        let id_decoded = this.state.id_decoded;


        const headers = {
            'Authorization': 'Basic ' + encoded,
            'Accept': 'application/x-www-form-urlencoded',
            'Content-Type': 'application/x-www-form-urlencoded',
        };

        const params = {
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': callback,
        };


        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'post';
        axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Authorization, Content-Type';
        axios.defaults.headers.common['Authorization'] = 'Basic ' + encoded;
        axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
        axios.defaults.headers.common['Accept'] = 'application/json';

        axios.post('https://localhost:9443/oauth2/token',qs.stringify(params),headers)

            .then(response => {

                console.log(response);


                this.validateResponse(response);

                let res_header = response.headers;
                this.setState({res_header});

                let res_data = response.data;
                this.setState({res_data})

                let config = response.config.headers;
                this.setState({config})

                let tokenSplit = response.data.id_token;
                var splitArr = tokenSplit.split(".");



                let id_header = splitArr[0];
                let id_body = splitArr[1];
                let id_signature = splitArr[2];



                let header_decoded = atob(id_header);
                this.setState({header_decoded})

                let body_decoded = atob(id_body);
                this.setState({body_decoded})

                let id_token = response.data.id_token;
                this.setState({id_token})

                let idEn = jwt_decode(id_token);
                this.setState({idEn})


                //  let sig_decoded = jwt_decode(id_signature);
                // // this.setState({sig_decoded})
                //  console.log(sig_decoded)

            })



            .catch(error => {
                this.handleError(error);
            });


    }


    render() {
        let res_data = this.state.res_data;
        let res_header = this.state.res_header;
        let status = this.state.status;
        let status_Text = this.state.status_Text;
        let config = this.state.config;
        let resultState = this.state.resultState;
        let summary = this.state.summary;

        console.log(res_header);

        let header_decoded = this.state.header_decoded;
        let body_decoded = this.state.body_decoded;

        let idEn = this.state.idEn;

        var data = [];

        for(var i in res_data) {
            data.push(res_data[i]);
        }

        let acc_token = data[0];
        let ref_token = data[1];
        let res_scope = data[2];
        let id_encoded = data[3];
        let tok_type = data[4];
        let time = data[5];

        const style = {
            height: 550,
            width: 500,
            margin: 20,
            textAlign: 'center',
            display: 'inline-block',
        };

        if (!this.state.isLoaded) {
            return (
                <form onSubmit={this.handleFormSubmit}>

                    <div className="container">
                        <div className="col-sm-6">
                            <br/><br/>
                            <Paper style={style} zDepth={5}>
                                <br/><br/>

                                <TextField
                                    hintText="Code"
                                    floatingLabelText="The Authorization code."
                                    floatingLabelFixed={true}
                                    onChange={this.handleAuthCodeChanged.bind(this)}
                                />

                                <br/>

                                <TextField
                                    hintText="Callback URL"
                                    floatingLabelText="The callback url of SP."
                                    floatingLabelFixed={true}
                                    onChange={this.handleCallbackChanged.bind(this)}
                                />

                                <br/>

                                <TextField
                                    hintText="Access Token Endpoint"
                                    floatingLabelText="The url which grant the token."
                                    floatingLabelFixed={true}
                                    onChange={this.handleAccTokenChanged.bind(this)}
                                />

                                <br/>

                                <TextField
                                    hintText="Client Id"
                                    floatingLabelText="The client Id."
                                    floatingLabelFixed={true}
                                    onChange={this.handleClientKeyChanged.bind(this)}
                                />

                                <br/>

                                <TextField
                                    hintText="Client Secret"
                                    floatingLabelText="Secret generated by the IDP."
                                    floatingLabelFixed={true}
                                    onChange={this.handleSecretChanged.bind(this)}
                                />

                                <br/><br/>

                                <RaisedButton
                                    label="Get Access Token"
                                    primary={true}
                                    type="submit"
                                />

                            </Paper>
                        </div>
                    </div>
                </form>

            );


        } else {
            return (

                <div className="container">

                    <div className="jumbotron">


                        <h4>The following results were generated during the test.</h4>
                        <b>Test Result:</b>{resultState}

                        <b>Summary of the Test: </b>
                        <br/>
                        Response status: {status} {status_Text}<br/>Authorization: Basic<br/>Scope: Openid






                    </div>

                    <div className="panel panel-primary">
                        <div className="panel-heading">Headers</div>
                        <div className="panel-body"><br/>

                            <h5>Request Headers</h5><p>
                                <Highlight className='javascript'>
                                    {JSON.stringify(config,null,'\t')}
                                </Highlight></p>
                            <br/>
                            <h5>Response Headers</h5>
                            <p>
                                <Highlight className='javascript'>
                                    {JSON.stringify(res_header,null,'\t')}
                                </Highlight><br/></p>
                        </div>
                    </div>

                    <div className="panel panel-primary">
                        <div className="panel-heading">Response Data</div>
                        <div className="panel-body">
                                    <pre className="break">
                                    <br/><p className = "break">
                                    access_token: "{acc_token}"<br/>
                                    expires_in: "{time}"<br/>
                                    id_token: "{id_encoded}"
                                    <br/>
                                    refresh_token: "{ref_token}"<br/>
                                    scope: "{res_scope}"<br/>
                                    token_type: "{tok_type}"<br/><br/></p>
                                    </pre>
                        </div>
                    </div>

                    <div className="panel panel-primary">
                        <div className="panel-heading">Encoded ID Token</div>
                        <div className="panel-body">
                                    <pre>
                                    <br/><p className = "break">
                                        {id_encoded}
                                    </p>
                                    </pre>
                        </div>
                    </div>

                    <div className="panel panel-primary">
                        <div className="panel-heading">Decoded ID Token</div>
                        <div className="panel-body">


                            <h5>HEADER: Algorithm and Token Type</h5>
                            <p>

                                <Highlight className='javascript'>
                                    {header_decoded}
                                </Highlight>

                            </p>
                            <br/>
                            <h5>PAYLOAD: Data</h5>

                            <p>
                                <Highlight className='javascript'>
                                    {JSON.stringify(idEn,null,'\t')}
                                </Highlight>
                            </p>

                            <br/>
                            <h5>VERIFY SIGNATURE</h5>
                            <p>
                                <Highlight className='javascript'>

                                </Highlight>
                            </p>

                        </div>
                    </div>
                </div>


            );


        }






    }}



