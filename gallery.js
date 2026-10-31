// Your portfolio. Each section gets its own menu link.
// To add a piece:
//   1. Drop the file into that section's folder
//   2. Add a line to the section's list below
//
// title: the piece's name
// meta (optional): a short note shown on the right, e.g. "After Effects"
// src:   path to the file — images, GIFs, videos (.mp4/.mov) and PDFs all work
// fit (optional): "contain" to show the whole image instead of cropping (good for tall or very wide pieces)
// thumb (videos only, optional): seconds into the video to show as the preview frame
// poster (videos only, optional): a still image shown before playback

const SECTIONS = [
  {
    id: "2d-animation",
    title: "2D Animation",
    folder: "2D_Animation",
    items: [
      { title: "Dance",                src: "myersB_Dance.mp4" },
      { title: "Lip Sync",             src: "lipsyncfinal.mp4" },
      { title: "Environment Parallax", src: "Myers_Brianna_EnvironmentParallax (2).mp4" },
      { title: "Multiplane",           src: "multiplanefinal.mp4" },
      { title: "Fire",                 src: "brianna-firegif.gif", meta: "Loop" },
      { title: "Robot",                src: "robotfinal.mp4" },
      { title: "Robot",                src: "robotgif.gif", meta: "Loop" },
      { title: "Dog",                  src: "dogfinall.mp4" },
      { title: "Biped Walk",           src: "myersB_BiPed_Walk.mp4", thumb: 0.5 },
      { title: "Tail Overlap",         src: "myersb-tailoverlap.mp4", thumb: 2 },
      { title: "Bouncing Ball",        src: "myersb-bouncingball-final.mp4" },
    ],
  },
  {
    id: "3d",
    title: "3D",
    folder: "3D",
    items: [
      { title: "Final Film",           src: "myers-brianna-final-movie.mp4" },
      { title: "Run & Jump",           src: "Myers_B_Run_Jump.mp4" },
      { title: "Exaggerated",          src: "Myers_B_Exaggerated_Final.mp4" },
      { title: "Normal",               src: "Myers_B_Normal_Final.mp4" },
      { title: "Lamp",                 src: "Myers_Brianna_Lamp.jpg" },
      { title: "Three-Point Lighting", src: "brianna-myers-brianna-3point.webp" },
      { title: "Ball Bounce",          src: "Myers_Brianna_BallBounce01.mp4" },
    ],
  },
  {
    id: "motion-graphics",
    title: "Motion Graphics",
    folder: "Motion_Graphics",
    items: [
      { title: "Liftoff",              src: "MAIN_Liftoff_11s.mp4", thumb: 5.5 },
      { title: "Text Motion Graphics", src: "Myers_Brianna_TextMotionGraphics (1).MP4", meta: "After Effects", thumb: 4 },
      { title: "Environment Parallax", src: "Myers_Brianna_EnvironmentParallax (2).mp4" },
      { title: "Lower Thirds",         src: "Myers_Brianna_02_LowerThirds.mp4", thumb: 3 },
    ],
  },
  {
    id: "character-design",
    title: "Character Design",
    folder: "Character_Design",
    items: [
      { title: "Master Pose",          meta: "Lead character",  src: "myersB_LeadChar_MasterPose.jpg" },
      { title: "Turnaround",           meta: "Lead character",  src: "myersB_LeadChar_TurnAround.jpg" },
      { title: "Expressions",          meta: "Lead character",  src: "myersB_LeadChar_Expressions.jpg" },
      { title: "Research",             meta: "Lead character",  src: "myersB_LeadChar_Research1.jpg" },
      { title: "Master",               meta: "Anthro",          src: "myersB_Anthro_Master.jpg" },
      { title: "Story Poses",          meta: "Anthro",          src: "myersB_Anthro_StoryPoses.jpg" },
      { title: "Expressions",          meta: "Anthro",          src: "myersB_Anthro_Expressions.jpg" },
      { title: "Shape Breakdown",      meta: "Anthro",          src: "myersB_Anthro_ShapeBreakdown.jpg" },
      { title: "Silhouette",           meta: "Anthro",          src: "myersB_Anthro_Silhouette.jpg" },
      { title: "Master",               meta: "Realistic",       src: "myersB_Realistic_Master.jpg", fit: "contain" },
      { title: "Research",             meta: "Realistic",       src: "myersB_Realistic_Research_Updated.jpg", fit: "contain" },
      { title: "Final",                meta: "Iconic",          src: "myersB_Iconic_Final.jpg" },
      { title: "Master",               meta: "Iconic",          src: "myersB_Iconic__Master.jpg" },
      { title: "Character Ladder",                              src: "myersB_Character_Ladder.jpg", fit: "contain" },
      { title: "The Over-Achiever & the Over-It",               src: "Simple_CharDesign03_1 - Copy.jpg" },
      { title: "Scenes",               meta: "Over-Achiever & Over-It", src: "Simple_CharDesign03_1 - Copy (5).jpg" },
      { title: "Silhouettes",          meta: "Over-Achiever & Over-It", src: "Simple_CharDesign03_1 - Copy (4).jpg" },
    ],
  },
  {
    id: "storyboards",
    title: "Storyboards",
    folder: "Storyboards",
    items: [
      { title: "Villain Intro",        src: "myersB_VillainIntroFInal.mp4", thumb: 23 },
      { title: "Visual Persuasion",    src: "myersB_Visual_Persuasion_SLOWED.mp4", thumb: 3.5 },
      { title: "Context of Space",     src: "myersB_Context_Space.pdf" },
    ],
  },
];
