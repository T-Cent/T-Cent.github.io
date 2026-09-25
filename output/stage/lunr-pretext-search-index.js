var ptx_lunr_search_style = "textbook";
var ptx_lunr_docs = [
{
  "id": "portfolio-2",
  "level": "1",
  "url": "portfolio-2.html",
  "type": "Front Matter",
  "number": "",
  "title": "Front Matter",
  "body": "  Taraash Mittal   "
},
{
  "id": "research",
  "level": "1",
  "url": "research.html",
  "type": "Section",
  "number": "1",
  "title": "Research",
  "body": " Research   Some publications and current work-in-progress.    AI4VA @ ECCV 2026: TexSketch  TexSketch: Bringing Texture-Aware Colorization to Sketches was work done under the Graphics Research Group in IIIT Delhi which was accepted at the AI 4 Visual Arts workshop at the European Conference on Computer Vision, with oral spotlight .   Our pipeline    Our pipeline describing the workflow     I came up with a new method to color black-and-white sketches and be able to get programmable art styles using the Open Shading Language. Some pretty pictures:    Input sketch: fish    Fish diagram      Basic shading    Basic coloring using our method      Cel shading    Specialized cel-shading\/anime style coloring      Watercolor    Specialized watercolor style coloring        Input sketch: grapes    Grapes      Cel shading    Specialized cel-shading\/anime style coloring      Watercolor    Specialized watercolor style coloring      The developed method is completely autonomous - just an input sketch is provided, no additional color hints or segments are required. We do that automatically. Color pallette hints may be produced in the prompt given to the vision model, if required.  Relevant links:   Website       GitHub       Paper       Graphics Research Group, IIIT Delhi          STEMvibe Research  Formed and currently lead the research department of STEMvibe.   ContrastGuidedMath  Working on ContrastGuidedMath (CGM), a competition dataset with pedagogical reasoning and understanding the effects of structured reasoning on large language models.  Currently under review at the MATH-AI workshop in NeurIPS, where I also served as a reciprocal reviewer.  This work was inspired by the third progress prize of the AIMO on Kaggle, funded by XTX Markets.   Annotation pass rate on 500 NuminaMath problems, measured by valid JSON outputs with non-empty hints and a present answer field.    Model  CGM FT  Valid \/ 500    Qwen2.5-Math-7B  ✓  480    Qwen2.5-Math-1.5B  ✓  150    GPT-oss-20B  —  85    Llama-3.1-8B  —  11    Qwen2.5-Math-7B  —  2    Qwen2.5-Math-1.5B  —  0     The showcases an inferior model on our fine-tuned annotation schema performing vastly better than a stronger open-weight. For the exam CGM schema, please refer to Kaggle dataset, linked below.    Inference-time utility of CGM annotations.    CGM Variant  Accuracy  Avg. hints    Full  70.9%  2.03    No hints  41.8%  —    No facts  76.4%  2.48    Base  27.3%  —      Inference-time ablation of CGM annotations on the CGM gold problems (N=55) using GPT-oss-20B.         Hints  Hints + Facts    1  29.1%  32.7%    2  43.6%  50.9%    3  58.2%  61.8%    4  67.3%  65.5%    5  70.9%  70.9%    6  76.4%  70.9%       shows the use-case of the CGM dataset at inference-time, rather than during fine-tuning. The model is prompted to solve the problem, and the prompt itself carries additional information from the CGM dataset.   evaluates whether hints and facts are actually useful in problem-solving.  The core motivation of the CGM dataset is to evaluate whether a model does better at problem solving if it can first decompose the problem into its constituting domain-dependent facts and possible attack vectors (or hints). The results show promise at inference-time. Results of fine-tuned models are currently under development.  Relevant links (the current CGM dataset is private due to the double-blind review, the links below are of the older AIMO3 dataset which inspired the ongoing development):   Kaggle Dataset       Kaggle Discussion          "
},
{
  "id": "texsketch-3",
  "level": "2",
  "url": "research.html#texsketch-3",
  "type": "Figure",
  "number": "1.1",
  "title": "",
  "body": " Our pipeline    Our pipeline describing the workflow    "
},
{
  "id": "texsketch-5-1",
  "level": "2",
  "url": "research.html#texsketch-5-1",
  "type": "Figure",
  "number": "1.2",
  "title": "",
  "body": " Input sketch: fish    Fish diagram    "
},
{
  "id": "texsketch-5-2",
  "level": "2",
  "url": "research.html#texsketch-5-2",
  "type": "Figure",
  "number": "1.3",
  "title": "",
  "body": " Basic shading    Basic coloring using our method    "
},
{
  "id": "texsketch-5-3",
  "level": "2",
  "url": "research.html#texsketch-5-3",
  "type": "Figure",
  "number": "1.4",
  "title": "",
  "body": " Cel shading    Specialized cel-shading\/anime style coloring    "
},
{
  "id": "texsketch-5-4",
  "level": "2",
  "url": "research.html#texsketch-5-4",
  "type": "Figure",
  "number": "1.5",
  "title": "",
  "body": " Watercolor    Specialized watercolor style coloring    "
},
{
  "id": "texsketch-6-1",
  "level": "2",
  "url": "research.html#texsketch-6-1",
  "type": "Figure",
  "number": "1.6",
  "title": "",
  "body": " Input sketch: grapes    Grapes    "
},
{
  "id": "texsketch-6-2",
  "level": "2",
  "url": "research.html#texsketch-6-2",
  "type": "Figure",
  "number": "1.7",
  "title": "",
  "body": " Cel shading    Specialized cel-shading\/anime style coloring    "
},
{
  "id": "texsketch-6-3",
  "level": "2",
  "url": "research.html#texsketch-6-3",
  "type": "Figure",
  "number": "1.8",
  "title": "",
  "body": " Watercolor    Specialized watercolor style coloring    "
},
{
  "id": "tab_annotation",
  "level": "2",
  "url": "research.html#tab_annotation",
  "type": "Table",
  "number": "1.9",
  "title": "Annotation pass rate on 500 NuminaMath problems, measured by valid JSON outputs with non-empty hints and a present answer field.",
  "body": " Annotation pass rate on 500 NuminaMath problems, measured by valid JSON outputs with non-empty hints and a present answer field.    Model  CGM FT  Valid \/ 500    Qwen2.5-Math-7B  ✓  480    Qwen2.5-Math-1.5B  ✓  150    GPT-oss-20B  —  85    Llama-3.1-8B  —  11    Qwen2.5-Math-7B  —  2    Qwen2.5-Math-1.5B  —  0    "
},
{
  "id": "tab_inference",
  "level": "2",
  "url": "research.html#tab_inference",
  "type": "Table",
  "number": "1.10",
  "title": "Inference-time utility of CGM annotations.",
  "body": " Inference-time utility of CGM annotations.    CGM Variant  Accuracy  Avg. hints    Full  70.9%  2.03    No hints  41.8%  —    No facts  76.4%  2.48    Base  27.3%  —    "
},
{
  "id": "tab_hints",
  "level": "2",
  "url": "research.html#tab_hints",
  "type": "Table",
  "number": "1.11",
  "title": "Inference-time ablation of CGM annotations on the CGM gold problems (N=55) using GPT-oss-20B.",
  "body": " Inference-time ablation of CGM annotations on the CGM gold problems (N=55) using GPT-oss-20B.         Hints  Hints + Facts    1  29.1%  32.7%    2  43.6%  50.9%    3  58.2%  61.8%    4  67.3%  65.5%    5  70.9%  70.9%    6  76.4%  70.9%    "
},
{
  "id": "mathematics",
  "level": "1",
  "url": "mathematics.html",
  "type": "Section",
  "number": "2",
  "title": "Mathematics",
  "body": " Mathematics  Here I'll list some cool math stuff I've done \/ am doing.   Numerical Methods for PDE's  Recreational research, primarily working through an extensive list of topics provided in Aitor Bergara's course on numerical methods for PDE's . Done under Dr. Subhashree Mohapatra .   Forward in time, centered in space    Start of advection    FTCS failing      "
},
{
  "id": "fig_waves",
  "level": "2",
  "url": "mathematics.html#fig_waves",
  "type": "Figure",
  "number": "2.1",
  "title": "",
  "body": " Forward in time, centered in space    Start of advection    FTCS failing    "
}
]

var ptx_lunr_idx = lunr(function () {
  this.ref('id')
  this.field('title')
  this.field('body')
  this.metadataWhitelist = ['position']

  ptx_lunr_docs.forEach(function (doc) {
    this.add(doc)
  }, this)
})
