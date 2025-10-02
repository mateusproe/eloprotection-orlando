import pathlib
import re

path = pathlib.Path(r'src/components/HeroCarousel.jsx')
text = path.read_text(encoding='utf-8')

text = text.replace("import beforeAfterImage from '../assets/images/before-after-protection.png'\r\n", "import constructionSiteImage from '../assets/images/construction-site-protection.jpeg'\r\n")
text = text.replace("import heroNewImage from '../assets/images/hero-new-image.png'\r\n", "import heavyMachineryImage from '../assets/images/heavy-machinery-protection.jpeg'\r\n")

first_slide_pattern = r"    {\r\n      type: 'image',\r\n      src: constructionSiteImage,?[^}]*?    },"
# pattern after replacement? currently still heroNewImage -> but we replaced import names yet to change object? need to match heroNewImage, not new name.
