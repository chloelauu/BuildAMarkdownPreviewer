const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
    const link = marked.Renderer.prototype.link.call(this, href, title, text);
    return link.replace("<a", "<a target='_blank' ");
};

marked.setOptions({
    breaks: true,
    renderer: renderer,
    sanitize: true
});

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markdown: placeholder
        };
        this.handleChange = this.handleChange.bind(this);
        this.converter = this.converter.bind(this);
    };

    handleChange(event) {
        this.setState({
            markdown: event.target.value
        })
    }

    converter() {
        let x = marked(this.state.markdown);
        return { __html: x };
    }

    render() {
        return (
            <div id="container">
                <h1 id="title">Markdown Previewer</h1>
                <div id="box1" class="rounded">
                    <label for="editor">Editor <i class="far fa-edit"></i></label>
                    <textarea value={this.state.markdown} onChange={this.handleChange} id="editor" name="editor" rows="999" />
                </div>
                <div id="box2" class="rounded">
                    <label for="preview">Previewer <i class="far fa-file-pdf"></i></label>
                    <div id="preview" dangerouslySetInnerHTML={this.converter()} />
                </div>
            </div>
        );
    }
};

const placeholder = `# This is a title!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

ReactDOM.render(<App />, document.getElementById('app'))