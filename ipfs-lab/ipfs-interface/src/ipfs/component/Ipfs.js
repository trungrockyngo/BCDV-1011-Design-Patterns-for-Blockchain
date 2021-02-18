import React from 'react';
import ipfsService from '../service/ipfs';

class Ipfs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            buffer: null,
            ipfsHash: '',
            retrievedFile: ''
        }
    }


    captureFileHandler = (evt) => {
        evt.preventDefault();
        const curFile = evt.target.files[0];

        /**     
         * NOTE: I struggle following the approach of using Nodejs until realizing 
        file is supported in web browser's window to be returned as buffer!!!
         */
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(curFile); //all other related funcs requiring Blob

        reader.onloadend = (ev) => {
            //ev.defaultPrevented(); 

            this.setState({
                buffer: Buffer(reader.result)
            });
            console.log('file captured succeeds with buffer ', this.state.buffer);
        }
    }

    uploadFileHandler = (evt) => {
        evt.preventDefault();

        // ipfsService.add(this.state.buffer, (err, res) => {
        //     if(err)  {
        //         console.log(err); 
        //         return
        //     }

        //     console.log('result returned from IPFS ', res);

        //     //keep track of ipfsHash to be shown on interface
        //     this.setState({ ipfsHash: res[0].hash })
        // });

        const res = ipfsService.add(this.state.buffer).then( (res) => {
                console.log('ipfs object is', res);

                //this.setState({ ipfsHash: res[0].hash });
                this.setState({ ipfsHash: res.path});

                console.log(`uploadFileHandler completed with file hash ${this.state.ipfsHash}`);
            }
        );
    }

    hashInputChange = (ev) => {
        this.setState({ hashID: ev.target.value })
    }

    retrieveFileHandler = (evt) => {
        evt.preventDefault();
        let hashID = this.state.hashID;
        let file;
        // if (hashID !== '') {
        //     file = ipfsService.get(hashID);
        //     console.log("If being able to get the file, here's the path ", file.path);
        // }
        file = ipfsService.get(this.state.ipfsHash);
        console.log("file ", file);

        console.log("If being able to get the file, here's its hashid ", file.path);

        this.setState({ retrievedFile: file });
    }


    render() {
        return (
            <>
                <h1>Upload your image</h1>
                <p> This image is stored on IPFS</p>
                <form onSubmit={this.uploadFileHandler}>
                    <input type="file" onChange={this.captureFileHandler} />
                    <button type="submit"> Upload image </button>
                </form>

                <form onSubmit={this.retrieveFileHandler}>
                    <label> Please pass in the hash of the image you knew to retrieve </label>
                    <input type="text" onChange={this.hashInputChange} />
                    <button type="submit"> Retrieve image </button>

                    <img src={this.state.retrievedFile} alt="wait to be fetched" />
                </form>
            </>
        );

    }
}

export default Ipfs; 