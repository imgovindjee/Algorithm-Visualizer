import React from 'react'

import { ReactTyped } from 'react-typed'

import { FaCode, FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa6'

import PageAnimationWrapper from '../../common/PageAnimationWrapper/PageAnimationWrapper'

import './AboutDeveloper.css'



const AboutDeveloper = () => {

    return (
        <>

            <PageAnimationWrapper>

                <section className='about'>
                    <div className="about__container">
                        <h3>Hello It's Me</h3>
                        <h1>Shree Govind Jee</h1>
                        <h3>
                            And I'm a&nbsp;
                            <span className='multiple__text'>
                                <ReactTyped
                                    strings={['Full-Stack Developer', 'Backend', 'DevO(Frontend)', 'Problem Solver', "Algorithm Analizer"]}
                                    typeSpeed={100}
                                    backSpeed={100}
                                    backDelay={1000}
                                    loop
                                />
                            </span>
                        </h3>
                        <p>
                            I am a dedicated and detail-oriented professional, consistently striving to enhance my skills and contribute effectively to team success, with a strong commitment to achieving high-quality results. As a Full-Stack Developer, given a diverse skill set and adaptability to both front-end and back-end development tasks
                        </p>

                        <div className='social__icons'>
                            <a
                                href='https://www.linkedin.com/in/shreegovindjee/'
                                target='_blank'
                            >
                                <FaLinkedin />
                            </a>
                            <a
                                href='https://www.instagram.com/imgovind_jee/'
                                target='_blank'
                            >
                                <FaInstagram />
                            </a>
                            <a
                                href='https://leetcode.com/u/Shree_Govind_Jee/'
                                target='_blank'
                            >
                                <FaCode />
                            </a>
                            <a
                                href='https://github.com/imgovindjee'
                                target='_blank'
                            >
                                <FaGithub />
                            </a>
                            <a
                                href='https://x.com/imgovind_jee'
                                target='_blank'
                            >
                                <FaTwitter />
                            </a>
                            <a
                                href='https://www.facebook.com/govind.jee.3154/'
                                target='_blank'
                            >
                                <FaFacebook />
                            </a>
                        </div>
                    </div>
                </section>

            </PageAnimationWrapper>

        </>
    )
}

export default AboutDeveloper
