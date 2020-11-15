
import React from "react";
import { addDecorator, addParameters } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import "../src/styles/index.scss"

addParameters({
	options: {
		showRoots: true,
		storySort: {
			order: ['Introduction', 'COLOR','Components'],
		  },
	},
	dependencies: {
		withStoriesOnly: true,
		hideEmpty: true,
	},
});
addDecorator(withA11y);
addDecorator((story) => (
	<>
		{story()}
	</>
));