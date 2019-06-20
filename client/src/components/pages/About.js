import React from 'react'
import {MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText} from "mdbreact";

import './About.css'

export default class About extends React.Component {

    render() {
        return (
            <MDBCard>
                <div className="blue pt-3 white-text">
                    <h2 className="h1-responsive font-weight-bold text-center my-5">
                        Sri Lanka Institute of Information Technology
                    </h2>
                </div>
                <div className="about-top-diagonal"></div>
                <section>
                    <div className="mb-0 pt-4 pl-4 pr-4 pb-0">
                        <p>We are a leading non-state degree awarding institute approved by the University Grants
                            Commission (UGC) under the Universities Act. We are members of the Association of
                            Commonwealth
                            Universities (ACU), as well as the International Association of Universities (IAU). We are
                            also
                            the first Sri Lankan institute to be accredited by the Institution of Engineering &
                            Technology,
                            UK.</p>

                        <p>SLIIT was established in 1999. We opened our doors to 400 students in Metro Campus in
                            Colombo.
                            Currently, we offer both undergraduate and postgraduate courses and accommodate over 7000
                            students, including international students from various regions in the world. More than 9000
                            alumni have graduated from our three faculties: Business, Computer, and Engineering. We take
                            great pride in producing graduates who make meaningful contributions to their communities
                            and
                            professions. Among our diversely qualified graduates, alumni are software engineers,
                            engineers,
                            business analysts and noted entrepreneurs.</p>
                        <MDBCardImage className="img-fluid mb-3" src={require("../../images/SLIIT-malabe.jpg")} waves/>

                        <p>SLIIT attracts the largest share of private higher education students in Sri Lanka and our
                            courses are designed to equip graduates to succeed in contemporary workplaces with their
                            exposure to practical (lab, internship etc) as well as the classroom environment. According
                            to
                            the graduate Tracer Studies of 2016/2017, nearly 90% of our Bachelor degree graduates find
                            full-time employment within six months of course completion. We are one of premier degree
                            awarding institutes with the 25 acres site to provide the university exposure for our
                            students.</p>

                        <p>We are proud to announce that our industry internship programmes with leading
                            multinational and
                            local organizations in Sri Lanka have provided an opportunity for our students to learn
                            beyond
                            the taught content, enhancing their professional personality, and provide them with a
                            greater
                            understanding about the practical application of their knowledge.</p>
                    </div>
                    <MDBCard className="m-3">
                        <MDBCardBody>
                            <MDBCardTitle>OUR VISION</MDBCardTitle>
                            <MDBCardText>
                                To advance knowledge, foster and promote innovation to enrich lives & broaden
                                horizons
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                    <MDBCard className="m-3">
                        <MDBCardBody>
                            <MDBCardTitle>OUR MISSION</MDBCardTitle>
                            <MDBCardText>
                                To create a learning and research environment with best possible resources for our
                                students and staff to be innovative and dedicated to excellence and to produce
                                graduates with strong analytical, problem solving and communication skills.
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                    <MDBCard className="m-3">
                        <MDBCardBody>
                            <MDBCardTitle>OUR OBJECTIVES</MDBCardTitle>
                            <MDBCardText>
                                Education & training of professionals at a high level of excellence in the fields of
                                IT, business and engineering assisting and promoting enterprises, innovators and
                                start-up companies with the necessary expertise to achieve business objectives
                                provision of consultancy services and software services to public and private sector
                                enterprises of Sri Lanka at a reasonable cost conduct and promotion of research &
                                development leading to specialized applications, services and innovative technology
                                products. Expanding horizons in the fields of IT, business and engineering to reach
                                international level
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                </section>
            </MDBCard>
        )
    }
}