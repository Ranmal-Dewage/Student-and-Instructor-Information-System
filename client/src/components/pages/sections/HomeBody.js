import React, {Component} from 'react';
import {
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBRow
} from 'mdbreact';
import EventCalender from './EventCalender';

class HomeBody extends Component {
    render() {
        return (
            <MDBRow className="mb-4">
                <MDBCol md="12" className="mb-4">
                    <MDBCard className="mb-4">
                        <MDBCardHeader>Latest announcements</MDBCardHeader>
                        <MDBCardBody>
                            <div className="row header clearfix">
                                <div className="left picture"><a
                                    href="http://courseweb.sliit.lk/user/profile.php?id=22494"></a></div>
                                <div className="topic firstpost starter">
                                    <div className="subject" role="heading" aria-level="2">Prorata Registration Notice
                                        FoE (June- Dec 2019)
                                    </div>
                                    <div className="author" role="heading" aria-level="2">by <a
                                        href="http://courseweb.sliit.lk/user/view.php?id=22494&amp;course=1">News
                                        Admin</a> - Tuesday, 11 June 2019, 5:52 PM
                                    </div>
                                </div>
                            </div>
                            <div className="row maincontent clearfix">
                                <div className="left">
                                    <div className="grouppictures">&nbsp;</div>
                                </div>
                                <div className="no-overflow">
                                    <div className="content">
                                        <div className="posting fullpost"><p>Prorata Registration Notice FoE (June- Dec
                                            2019)<br/></p>
                                            <div className="attachedimages"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row side">
                                <div className="left">&nbsp;</div>
                                <div className="options clearfix">
                                    <div className="attachments"><a
                                        href="http://courseweb.sliit.lk/pluginfile.php/49/mod_forum/attachment/15430/Prorata%20Registration%20Notice%20Jun-Dec%20FOE.pdf"></a>
                                        <a href="http://courseweb.sliit.lk/pluginfile.php/49/mod_forum/attachment/15430/Prorata%20Registration%20Notice%20Jun-Dec%20FOE.pdf">Prorata
                                            Registration Notice Jun-Dec FOE.pdf</a><br/><br/></div>
                                    <div className="commands"><a
                                        href="http://courseweb.sliit.lk/mod/forum/discuss.php?d=7275#p15430">Permalink</a>
                                    </div>
                                </div>
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol md="12" className="mb-4">
                    <MDBCard className="mb-4" style={{height: 500}}>
                        <MDBCardHeader>Event Calender</MDBCardHeader>
                        <MDBCardBody>
                            <EventCalender/>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        )
    }
}

export default HomeBody;

