import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, staticFile} from 'remotion';
import {Video} from '@remotion/media';
import type {Caption} from '@remotion/captions';

export type CaptionPage = {words: Caption[]; top?: number};
export const CenterCaptions: React.FC<{pages: CaptionPage[]; top: number}> = ({pages,top}) => {
 const frame=useCurrentFrame(); const {fps}=useVideoConfig(); const ms=frame/fps*1000;
 const page=pages.find(p=>ms>=p.words[0].startMs && ms<p.words[p.words.length-1].endMs+120);
 if(!page)return null;
 const age=(ms-page.words[0].startMs)/1000*fps;
 return <div style={{position:'absolute',left:90,width:900,top:page.top??top,textAlign:'center',fontFamily:'Arial, sans-serif',fontWeight:900,fontSize:74,lineHeight:1.12,letterSpacing:-1.5,color:'#ffffff',WebkitTextStroke:'5px #101010',paintOrder:'stroke fill',textShadow:'0 5px 10px rgba(0,0,0,.48)',scale:interpolate(age,[0,3],[0.97,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),translate:'0 -50%'}}>
  {page.words.map((word,i)=><React.Fragment key={i}><span style={{color:ms>=word.startMs && ms<word.endMs?'#FFE247':'#FFFFFF'}}>{word.text.trim()}</span>{i<page.words.length-1?' ':''}</React.Fragment>)}
 </div>;
};

export const Footage: React.FC<{file:string; landscape?:boolean; trimBefore?:number; length?:number}> = ({file,landscape=false,trimBefore=0,length}) => {
 const frame=useCurrentFrame();const config=useVideoConfig();const durationInFrames=length??config.durationInFrames;
 const sourceTime=(frame+trimBefore)/config.fps;
 const crop=sourceTime>=12.75?66:sourceTime>=8.2&&sourceTime<10.9?62:sourceTime>=3.6&&sourceTime<5?65:50;
 return <AbsoluteFill style={{overflow:'hidden',backgroundColor:'#000'}}>
  <Video name="Official trailer excerpt" src={staticFile(file)} trimBefore={trimBefore} durationInFrames={durationInFrames} objectFit="cover" style={{width:'100%',height:'100%',objectPosition:landscape?`${crop}% 50%`:'50% 50%',scale:interpolate(frame,[0,durationInFrames-1],[1,1.025],{extrapolateRight:'clamp'})}}/>
 </AbsoluteFill>;
};
