import type { Locator, Page } from "@playwright/test";
import {
  checkWhenVisible,
  clearWhenVisible,
  clickOpensNewPage,
  clickWhenVisible,
  closePage,
  doubleClickWhenVisible,
  expectChecked,
  expectContainsText,
  expectCount,
  expectCountGreaterThan,
  expectDisabled,
  expectEnabled,
  expectFocused,
  expectHidden,
  expectPageTitle,
  expectSelected,
  expectText,
  expectUnchecked,
  expectValue,
  expectVisible,
  fill,
  fillWhenVisible,
  getTextWhenVisible,
  goBack,
  hoverWhenVisible,
  longPressWhenVisible,
  navigateTo,
  scrollIntoView,
  scrollIntoViewWhenVisible,
  selectOptionWhenVisible,
  takeScreenshot,
  typeTextWhenVisible,
  uncheckWhenVisible,
  waitForHidden,
  waitForNewPage,
  waitForVisible,
  waitMs,
  webLocator,
} from "../support/web-actions";
import { webTable, type WebTable } from "../support/web-table";

export class HomePage {
  private static readonly L = {
    openMenuItemSubmenu: { strategy: 'role' as const, value: 'Open menu item submenu', role: 'option', actionKind: 'generic' as const },
    option: { strategy: 'css' as const, value: '[role="option"]', actionKind: 'generic' as const },
    skipToNavigation: { strategy: 'role' as const, value: 'Skip to Navigation', role: 'link', actionKind: 'link' as const },
    skipToMainContent: { strategy: 'role' as const, value: 'Skip to Main Content', role: 'link', actionKind: 'link' as const },
    togglePanel: { strategy: 'role' as const, value: 'Toggle Panel', role: 'button', shadowHost: 'devops_center-panel-button', actionKind: 'button' as const },
    sandboxSdev: { strategy: 'text' as const, value: 'Sandbox (SDEV)', shadowHost: 'devops_center-org-info', actionKind: 'text' as const },
    showMenu: { strategy: 'role' as const, value: 'Show menu', role: 'button', shadowHost: 'lightning-button-menu', actionKind: 'button' as const },
    search: { strategy: 'role' as const, value: 'Search', role: 'button', actionKind: 'button' as const },
    agentforce: { strategy: 'role' as const, value: 'Agentforce', role: 'option', actionKind: 'generic' as const },
    thisItemDoesnTSupport: { strategy: 'role' as const, value: 'This item doesn\'t support favorites Favorites list', role: 'option', actionKind: 'generic' as const },
    thisItemDoesnTSupportButton: { strategy: 'role' as const, value: 'This item doesn\'t support favorites', role: 'button', actionKind: 'button' as const },
    favoritesList: { strategy: 'role' as const, value: 'Favorites list', role: 'button', actionKind: 'button' as const },
    globalActions: { strategy: 'role' as const, value: 'Global Actions', role: 'option', actionKind: 'generic' as const },
    guidanceCenter: { strategy: 'role' as const, value: 'Guidance Center', role: 'option', actionKind: 'generic' as const },
    salesforceHelp: { strategy: 'role' as const, value: 'Salesforce Help', role: 'option', actionKind: 'generic' as const },
    setup: { strategy: 'role' as const, value: 'Setup', role: 'option', actionKind: 'generic' as const },
    notifications: { strategy: 'role' as const, value: 'Notifications', role: 'option', actionKind: 'generic' as const },
    viewProfile: { strategy: 'role' as const, value: 'View profile', role: 'option', actionKind: 'generic' as const },
    appLauncher: { strategy: 'role' as const, value: 'App Launcher', role: 'button', shadowHost: 'one-app-launcher-header', actionKind: 'button' as const },
    salesforceCpqLightning: { strategy: 'role' as const, value: 'Salesforce CPQ(Lightning)', role: 'heading', level: 1, shadowHost: 'one-appnav', actionKind: 'text' as const },
    home: { strategy: 'role' as const, value: 'Home', role: 'link', shadowHost: 'one-app-nav-bar-item-root', actionKind: 'link' as const },
    accounts: { strategy: 'role' as const, value: 'Accounts', role: 'link', shadowHost: 'one-app-nav-bar-item-root', actionKind: 'link' as const },
    accountsList: { strategy: 'role' as const, value: 'Accounts List', role: 'button', shadowHost: 'one-app-nav-bar-menu-button', actionKind: 'link' as const },
    opportunities: { strategy: 'role' as const, value: 'Opportunities', role: 'link', shadowHost: 'one-app-nav-bar-item-root', actionKind: 'link' as const },
    opportunitiesList: { strategy: 'role' as const, value: 'Opportunities List', role: 'button', shadowHost: 'one-app-nav-bar-menu-button', actionKind: 'link' as const },
    quotes: { strategy: 'role' as const, value: 'Quotes', role: 'link', shadowHost: 'one-app-nav-bar-item-root', actionKind: 'link' as const },
    quotesList: { strategy: 'role' as const, value: 'Quotes List', role: 'button', shadowHost: 'one-app-nav-bar-menu-button', actionKind: 'link' as const },
    quoteTerms: { strategy: 'role' as const, value: 'Quote Terms', role: 'link', shadowHost: 'one-app-nav-bar-item-root', actionKind: 'link' as const },
    quoteTermsList: { strategy: 'role' as const, value: 'Quote Terms List', role: 'button', shadowHost: 'one-app-nav-bar-menu-button', actionKind: 'link' as const },
    orders: { strategy: 'role' as const, value: 'Orders', role: 'link', shadowHost: 'one-app-nav-bar-item-root', actionKind: 'link' as const },
    ordersList: { strategy: 'role' as const, value: 'Orders List', role: 'button', shadowHost: 'one-app-nav-bar-menu-button', actionKind: 'link' as const },
    unableToLoad: { strategy: 'role' as const, value: '* Unable to load', role: 'link', shadowHost: 'one-app-nav-bar-item-root', actionKind: 'link' as const },
    unableToLoadList: { strategy: 'role' as const, value: 'Unable to load List', role: 'button', shadowHost: 'one-app-nav-bar-menu-button', actionKind: 'link' as const },
    closeTab: { strategy: 'role' as const, value: 'Close tab', role: 'button', shadowHost: 'one-app-nav-bar-item-root', actionKind: 'button' as const },
    moreShowMoreNavigation: { strategy: 'role' as const, value: 'More Show more navigation items', role: 'button', shadowHost: 'one-app-nav-bar-menu-button', actionKind: 'link' as const },
    personalizeYourNavBar: { strategy: 'role' as const, value: 'Edit nav items', role: 'button', shadowHost: 'lightning-button-icon', actionKind: 'button' as const },
    tasks: { strategy: 'role' as const, value: 'Tasks', role: 'heading', level: 1, shadowHost: 'lst-breadcrumbs', actionKind: 'text' as const },
    myOpenTasksEditable: { strategy: 'role' as const, value: '*My Open Tasks Editable', role: 'link', actionKind: 'link' as const },
    newTask: { strategy: 'role' as const, value: 'New Task', role: 'button', actionKind: 'link' as const },
    assignLabel: { strategy: 'role' as const, value: 'Assign Label', role: 'button', actionKind: 'link' as const },
    itemsSorted: { strategy: 'text' as const, value: '0 items • Sorted by Due Date • Filtered by My', actionKind: 'text' as const },
    updatedAMinuteAgo: { strategy: 'text' as const, value: 'Updated a minute ago', shadowHost: 'force-list-view-manager-status-info', actionKind: 'text' as const },
    searchThisList: { strategy: 'role' as const, value: 'Search this list...', role: 'searchbox', shadowHost: 'lightning-primitive-input-simple', actionKind: 'textbox' as const },
    listViewControls: { strategy: 'role' as const, value: 'List View Controls', role: 'button', actionKind: 'button' as const },
    refreshButton: { strategy: 'role' as const, value: 'Refresh', role: 'button', shadowHost: 'lightning-button-icon', actionKind: 'button' as const },
    inlineEditButton: { strategy: 'role' as const, value: 'Edit List', role: 'button', shadowHost: 'lightning-button-icon', actionKind: 'button' as const },
    sortDueDate: { strategy: 'role' as const, value: 'Sort Due Date', role: 'button', actionKind: 'link' as const },
    showDueDateColumn: { strategy: 'role' as const, value: 'Show Due Date Column Actions', role: 'button', actionKind: 'button' as const },
    dueDateColumnWidth: { strategy: 'role' as const, value: 'Due Date column width', role: 'textbox', actionKind: 'generic' as const },
    sortSubject: { strategy: 'role' as const, value: 'Sort Subject', role: 'button', actionKind: 'link' as const },
    showSubjectColumnActions: { strategy: 'role' as const, value: 'Show Subject Column Actions', role: 'button', actionKind: 'button' as const },
    subjectColumnWidth: { strategy: 'role' as const, value: 'Subject column width', role: 'textbox', actionKind: 'generic' as const },
    sortName: { strategy: 'role' as const, value: 'Sort Name', role: 'button', actionKind: 'link' as const },
    showNameColumnActions: { strategy: 'role' as const, value: 'Show Name Column Actions', role: 'button', actionKind: 'button' as const },
    nameColumnWidth: { strategy: 'role' as const, value: 'Name column width', role: 'textbox', actionKind: 'generic' as const },
    sortRelatedTo: { strategy: 'role' as const, value: 'Sort Related To', role: 'button', actionKind: 'link' as const },
    showRelatedToColumn: { strategy: 'role' as const, value: 'Show Related To Column Actions', role: 'button', actionKind: 'button' as const },
    relatedToColumnWidth: { strategy: 'role' as const, value: 'Related To column width', role: 'textbox', actionKind: 'generic' as const },
    sortUkgActivityType: { strategy: 'role' as const, value: 'Sort UKG Activity Type', role: 'button', actionKind: 'link' as const },
    showUkgActivityType: { strategy: 'role' as const, value: 'Show UKG Activity Type Column Actions', role: 'button', actionKind: 'button' as const },
    ukgActivityTypeColumn: { strategy: 'role' as const, value: 'UKG Activity Type column width', role: 'textbox', actionKind: 'generic' as const },
    sortTypeDetail: { strategy: 'role' as const, value: 'Sort Type Detail', role: 'button', actionKind: 'link' as const },
    showTypeDetailColumn: { strategy: 'role' as const, value: 'Show Type Detail Column Actions', role: 'button', actionKind: 'button' as const },
    typeDetailColumnWidth: { strategy: 'role' as const, value: 'Type Detail column width', role: 'textbox', actionKind: 'generic' as const },
    sortDisposition: { strategy: 'role' as const, value: 'Sort Disposition', role: 'button', actionKind: 'link' as const },
    showDispositionColumnActions: { strategy: 'role' as const, value: 'Show Disposition Column Actions', role: 'button', actionKind: 'button' as const },
    dispositionColumnWidth: { strategy: 'role' as const, value: 'Disposition column width', role: 'textbox', actionKind: 'generic' as const },
    sortPriority: { strategy: 'role' as const, value: 'Sort Priority', role: 'button', actionKind: 'link' as const },
    showPriorityColumnActions: { strategy: 'role' as const, value: 'Show Priority Column Actions', role: 'button', actionKind: 'button' as const },
    priorityColumnWidth: { strategy: 'role' as const, value: 'Priority column width', role: 'textbox', actionKind: 'generic' as const },
    sortStatus: { strategy: 'role' as const, value: 'Sort Status', role: 'button', actionKind: 'link' as const },
    showStatusColumnActions: { strategy: 'role' as const, value: 'Show Status Column Actions', role: 'button', actionKind: 'button' as const },
    statusColumnWidth: { strategy: 'role' as const, value: 'Status column width', role: 'textbox', actionKind: 'generic' as const },
    sortLastModifiedBy: { strategy: 'role' as const, value: 'Sort Last Modified By Alias', role: 'button', actionKind: 'link' as const },
    showLastModifiedBy: { strategy: 'role' as const, value: 'Show Last Modified By Alias Column Actions', role: 'button', actionKind: 'button' as const },
    lastModifiedByAlias: { strategy: 'role' as const, value: 'Last Modified By Alias column width', role: 'textbox', actionKind: 'generic' as const },
    noItemsToDisplay: { strategy: 'text' as const, value: 'No items to display.', actionKind: 'text' as const },
    homeCardHeader6140: { strategy: 'css' as const, value: '#homeCardHeader_614:0', role: 'heading', level: 2, actionKind: 'text' as const },
    nagalingaBKammar: { strategy: 'role' as const, value: 'Nagalinga B Kammar', role: 'link', actionKind: 'link' as const },
    ashishBhasin: { strategy: 'role' as const, value: 'Ashish Bhasin', role: 'link', actionKind: 'link' as const },
    operatingUnit: { strategy: 'altText' as const, value: 'Operating Unit', actionKind: 'generic' as const },
    kronosUsOu: { strategy: 'role' as const, value: 'KRONOS US OU', role: 'link', actionKind: 'link' as const },
    order: { strategy: 'altText' as const, value: 'Order', actionKind: 'generic' as const },
    parulGajbhiye: { strategy: 'role' as const, value: 'Parul Gajbhiye', role: 'link', actionKind: 'link' as const },
    viewAllRecentRecords: { strategy: 'role' as const, value: 'View All Recent Records', role: 'button', actionKind: 'link' as const },
    post: { strategy: 'text' as const, value: 'Post', actionKind: 'generic' as const },
    postTab: { strategy: 'role' as const, value: 'Post', role: 'link', actionKind: 'link' as const },
    shareAnUpdate: { strategy: 'role' as const, value: 'Share an update...', role: 'button', actionKind: 'button' as const },
    share: { strategy: 'role' as const, value: 'Share', role: 'button', actionKind: 'button' as const },
    sortBy: { strategy: 'role' as const, value: 'Sort by:', role: 'button', shadowHost: 'lightning-base-combobox', actionKind: 'button' as const },
    searchThisFeed: { strategy: 'role' as const, value: 'Search this feed...', role: 'searchbox', shadowHost: 'lightning-primitive-input-simple', actionKind: 'textbox' as const },
    filterFeed: { strategy: 'role' as const, value: 'Filter Feed', role: 'button', shadowHost: 'lightning-button-menu', actionKind: 'button' as const },
    refreshThisFeed: { strategy: 'role' as const, value: 'Refresh this feed', role: 'button', actionKind: 'button' as const },
    skipFeed: { strategy: 'role' as const, value: 'Skip Feed', role: 'link', actionKind: 'link' as const },
    shaneAndersonLikeCommentShare: { strategy: 'role' as const, value: 'Shane Anderson', role: 'link', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'link' as const },
    actionsForThisFeedLikeCommentShare: { strategy: 'role' as const, value: 'Actions for this Feed Item', role: 'button', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'button' as const },
    hiAllFromPrint: { strategy: 'text' as const, value: 'Hi all, from Print Support', actionKind: 'text' as const },
    fedExHasPostedThe: { strategy: 'text' as const, value: 'FedEx has posted the following link regarding the', actionKind: 'text' as const },
    httpsWwwFedexComEnUsServiceAlertsHtmlLikeCommentShare: { strategy: 'role' as const, value: 'https://www.fedex.com/en-us/service-alerts.html', role: 'link', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'link' as const },
    winterStormAdvisory: { strategy: 'text' as const, value: 'Winter Storm Advisory', actionKind: 'text' as const },
    forSpecificShipmentStatusLikeCommentShare: { strategy: 'text' as const, value: 'For specific shipment status information, please', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'text' as const },
    httpsWwwFedexComEnUsTrackingCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326: { strategy: 'role' as const, value: 'track', role: 'link', actionKind: 'link' as const },
    yourShipmentAt: { strategy: 'text' as const, value: 'your shipment at', actionKind: 'text' as const },
    fedexCom: { strategy: 'role' as const, value: 'fedex.com', role: 'link', actionKind: 'link' as const },
    residentialRecipientsCan: { strategy: 'text' as const, value: '. Residential recipients can enroll in', actionKind: 'text' as const },
    httpsWwwFedexComEnUsDeliveryManagerHtmlCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326: { strategy: 'role' as const, value: 'FedEx Delivery Manager', role: 'link', actionKind: 'link' as const },
    toStayInformedOf: { strategy: 'text' as const, value: 'to stay informed of their shipment’s progress.', actionKind: 'text' as const },
    thankYouExceptionalCustomer: { strategy: 'text' as const, value: 'Thank you! @*Exceptional Customer Experience (CX)​', actionKind: 'text' as const },
    thankYouLikeCommentShare: { strategy: 'text' as const, value: 'Thank you!', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'text' as const },
    exceptionalCustomerExperienceCxLikeCommentShare: { strategy: 'role' as const, value: '@*Exceptional Customer Experience (CX)', role: 'link', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'link' as const },
    cCManagedServices: { strategy: 'role' as const, value: '@C&C - Managed Services Teams', role: 'link', actionKind: 'link' as const },
    showMoreTextLikeCommentShare: { strategy: 'role' as const, value: 'Expand Post', role: 'link', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'link' as const },
    wwwFedexComLikeCommentShare: { strategy: 'role' as const, value: 'www.fedex.com', role: 'link', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'link' as const },
    likeLikeCommentShare: { strategy: 'role' as const, value: 'Like', role: 'option', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'generic' as const },
    commentLikeCommentShare: { strategy: 'role' as const, value: 'Comment', role: 'option', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'generic' as const },
    seenBy149LikeCommentShare: { strategy: 'role' as const, value: 'Seen by 149', role: 'option', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'generic' as const },
    likesThisLikeCommentShare: { strategy: 'text' as const, value: 'likes this.', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'text' as const },
    susanWescott: { strategy: 'role' as const, value: 'Susan Wescott', role: 'link', actionKind: 'link' as const },
    input271: { strategy: 'placeholder' as const, value: 'Write a comment...', shadowHost: 'lightning-primitive-input-simple', actionKind: 'textbox' as const },
    exceptionalCustomerExperienceCxNoteTest: { strategy: 'text' as const, value: '*Exceptional Customer Experience (CX) — Jana Ham', scope: 'ol > li', scopeText: 'Note test', actionKind: 'text' as const },
    exceptionalCustomerExperienceCxNoteTest2: { strategy: 'role' as const, value: '*Exceptional Customer Experience (CX)', role: 'link', scope: 'ol > li', scopeText: 'Note test', actionKind: 'link' as const },
    janaHam: { strategy: 'role' as const, value: 'Jana Ham', role: 'link', actionKind: 'link' as const },
    testNoteTest: { strategy: 'text' as const, value: 'test', scope: 'ol > li', scopeText: 'Note test', actionKind: 'text' as const },
    noteTestNoteTest: { strategy: 'text' as const, value: 'Note test Note test', actionKind: 'text' as const },
    viewFileTest: { strategy: 'role' as const, value: 'Note test', role: 'link', actionKind: 'link' as const },
    seenBy113NoteTest: { strategy: 'role' as const, value: 'Seen by 113', role: 'option', scope: 'ol > li', scopeText: 'Note test', actionKind: 'generic' as const },
    laurenMoodie: { strategy: 'role' as const, value: 'Lauren Moodie', role: 'link', actionKind: 'link' as const },
    ronaldLoftonLikeComment: { strategy: 'text' as const, value: '21936163 — Ronald Lofton to UKG Internal Only', scope: 'ol > li', scopeText: 'Like Comment', actionKind: 'text' as const },
    ronaldLoftonLikeComment2: { strategy: 'role' as const, value: 'Ronald Lofton', role: 'link', scope: 'ol > li', scopeText: 'Like Comment', actionKind: 'link' as const },
    toUkgInternalOnlyLikeComment: { strategy: 'text' as const, value: 'to UKG Internal Only', scope: 'ol > li', scopeText: 'Like Comment', actionKind: 'text' as const },
    hiExceptionalCustomerExperience: { strategy: 'text' as const, value: 'Hi @*Exceptional Customer Experience (CX)​ Can you', actionKind: 'text' as const },
    hi: { strategy: 'text' as const, value: 'Hi', actionKind: 'text' as const },
    canYouPlease: { strategy: 'text' as const, value: '​ Can you please add to your priority list. This', actionKind: 'text' as const },
    commentLikeComment3: { strategy: 'text' as const, value: '1 comment', scope: 'ol > li', scopeText: 'Like Comment', actionKind: 'generic' as const },
    seenBy52LikeComment: { strategy: 'role' as const, value: 'Seen by 52', role: 'option', scope: 'ol > li', scopeText: 'Like Comment', actionKind: 'generic' as const },
    gouravSharma2Years: { strategy: 'text' as const, value: 'Gourav Sharma 2 years ago Actions for this Feed', actionKind: 'text' as const },
    gouravSharmaLikeComment: { strategy: 'role' as const, value: 'Gourav Sharma', role: 'link', scope: 'ol > li', scopeText: 'Like Comment', actionKind: 'link' as const },
    actionsForThisFeedLikeComment2: { strategy: 'role' as const, value: 'Actions for this Feed Item Comment', role: 'button', scope: 'ol > li', scopeText: 'Like Comment', actionKind: 'button' as const },
    hiRonaldIfYou: { strategy: 'text' as const, value: 'Hi Ronald, If you need network assistance? please', actionKind: 'text' as const },
    showLikes: { strategy: 'role' as const, value: '2 likes', role: 'button', shadowHost: 'lightning-button', actionKind: 'button' as const },
    exceptionalCustomerExperienceCx: { strategy: 'text' as const, value: '*Exceptional Customer Experience (CX) — Erica', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'text' as const },
    ericaDriverLikeCommentShare: { strategy: 'role' as const, value: 'Erica Driver', role: 'link', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'link' as const },
    customerAdvocacyInsidersFY22: { strategy: 'text' as const, value: 'Customer Advocacy (Insiders) FY22 Q2 Results', actionKind: 'text' as const },
    httpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v86HQAQ: { strategy: 'role' as const, value: 'Link to UKG Today post', role: 'link', actionKind: 'link' as const },
    fY22Q2Highlights: { strategy: 'text' as const, value: 'FY22 Q2 highlights:', actionKind: 'text' as const },
    advocacyInfluencedBookings385MArr: { strategy: 'text' as const, value: 'Advocacy-influenced bookings $38.5M ARR (176 deals', actionKind: 'text' as const },
    relationshipManagementChunHarvey: { strategy: 'text' as const, value: 'Relationship management: Chun Harvey, Linda', actionKind: 'text' as const },
    relationshipManagementLikeCommentShare: { strategy: 'text' as const, value: 'Relationship management:', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'text' as const },
    httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r63MAAQ: { strategy: 'role' as const, value: 'Chun Harvey', role: 'link', actionKind: 'link' as const },
    httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006mcQBAAY: { strategy: 'role' as const, value: 'Linda Zavatsky', role: 'link', actionKind: 'link' as const },
    andLikeCommentShare: { strategy: 'text' as const, value: ', and', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'text' as const },
    httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006rOQfAAM: { strategy: 'role' as const, value: 'Carly Storie', role: 'link', actionKind: 'link' as const },
    salesKimCalhounChrissi: { strategy: 'text' as const, value: 'Sales: Kim Calhoun, Chrissi Beck, and Russell Holm', actionKind: 'text' as const },
    salesLikeCommentShare: { strategy: 'text' as const, value: 'Sales:', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'text' as const },
    httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4I2AAI: { strategy: 'role' as const, value: 'Kim Calhoun', role: 'link', actionKind: 'link' as const },
    httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4apAAA: { strategy: 'role' as const, value: 'Chrissi Beck', role: 'link', actionKind: 'link' as const },
    httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000007JXOfAAO: { strategy: 'role' as const, value: 'Russell Holm Jr.', role: 'link', actionKind: 'link' as const },
    insidersParticipatedIn107: { strategy: 'text' as const, value: 'Insiders participated in 107 feedback activities', actionKind: 'text' as const },
    weSent202Insider: { strategy: 'text' as const, value: 'We sent 202 Insider gift offers (41.5% redeemed)', actionKind: 'text' as const },
    insidersParticipatedIn79: { strategy: 'text' as const, value: 'Insiders participated in 79 marketing activities', actionKind: 'text' as const },
    gotQuestionsReachOutLikeCommentShare: { strategy: 'text' as const, value: 'Got questions? Reach out to the Customer Advocacy', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'text' as const },
    insidersUkgComLikeCommentShare: { strategy: 'role' as const, value: 'Insiders@UKG.com', role: 'link', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'link' as const },
    lindaZavatskyCarlyStorie: { strategy: 'text' as const, value: '@Linda Zavatsky​ @Carly Storie​ @Kimberly Calhoun​', actionKind: 'text' as const },
    lindaZavatsky: { strategy: 'role' as const, value: '@Linda Zavatsky', role: 'link', actionKind: 'link' as const },
    carlyStorie: { strategy: 'role' as const, value: '@Carly Storie', role: 'link', actionKind: 'link' as const },
    kimberlyCalhoun: { strategy: 'role' as const, value: '@Kimberly Calhoun', role: 'link', actionKind: 'link' as const },
    allThingsSalesLikeCommentShare: { strategy: 'role' as const, value: '@All Things Sales', role: 'link', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'link' as const },
    archivedLikeCommentShare: { strategy: 'text' as const, value: '(Archived)', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'text' as const },
    allThingsCustomerSuccessLikeCommentShare: { strategy: 'role' as const, value: '@All Things Customer Success', role: 'link', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'link' as const },
    allThingsServicesLikeCommentShare: { strategy: 'role' as const, value: '@All Things Services', role: 'link', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'link' as const },
    seenBy40LikeCommentShare: { strategy: 'role' as const, value: 'Seen by 40', role: 'option', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'generic' as const },
    andLikeLikeCommentShare: { strategy: 'text' as const, value: ', , and like this.', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'text' as const },
    opalWagnac: { strategy: 'role' as const, value: 'Opal Wagnac', role: 'link', actionKind: 'link' as const },
    orielSilvaLikeCommentShare: { strategy: 'role' as const, value: 'Oriel Silva', role: 'link', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'link' as const },
    othersLikeCommentShare: { strategy: 'role' as const, value: '10 others', role: 'link', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'link' as const },
    customerAdvocacyInsidersTeam: { strategy: 'text' as const, value: 'Customer Advocacy (Insiders Team) FY22 Q1 Results', actionKind: 'text' as const },
    weVePublishedOurCustomer: { strategy: 'text' as const, value: 'We’ve published our Customer Advocacy FY22 Q1', actionKind: 'text' as const },
    weVePublishedOur: { strategy: 'text' as const, value: 'We’ve published our', actionKind: 'text' as const },
    httpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v61ZQAQ: { strategy: 'role' as const, value: 'Customer Advocacy FY22 Q1 results (internal use', role: 'link', actionKind: 'link' as const },
    hugeGiantThanksTo: { strategy: 'text' as const, value: 'HUGE, giant thanks to our top Insider nominators!', actionKind: 'text' as const },
    hugeGiant: { strategy: 'text' as const, value: 'HUGE, giant', actionKind: 'text' as const },
    thanksToOurTop: { strategy: 'text' as const, value: 'thanks to our top Insider nominators!', actionKind: 'text' as const },
    relationshipManagementMicheleBronder: { strategy: 'text' as const, value: 'Relationship management: Michele Bronder (18),', actionKind: 'text' as const },
    httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6imAAA: { strategy: 'role' as const, value: 'Michele Bronder', role: 'link', actionKind: 'link' as const },
    elementLikeCommentShare: { strategy: 'text' as const, value: '(18),', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'text' as const },
    httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r5zKAAQ: { strategy: 'role' as const, value: 'Carol Hathaway', role: 'link', actionKind: 'link' as const },
    and2: { strategy: 'text' as const, value: '(10), and', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'text' as const },
    httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r773AAA: { strategy: 'role' as const, value: 'Tracey McDaniel', role: 'link', actionKind: 'link' as const },
    element: { strategy: 'text' as const, value: '(6)', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'text' as const },
    salesMollyBondellio13: { strategy: 'text' as const, value: 'Sales: Molly Bondellio (13), David Trueira (5),', actionKind: 'text' as const },
    httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6jYAAQ: { strategy: 'role' as const, value: 'Molly Bondellio', role: 'link', actionKind: 'link' as const },
    element2: { strategy: 'text' as const, value: '(13),', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'text' as const },
    httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r66fAAA: { strategy: 'role' as const, value: 'David Trueira', role: 'link', actionKind: 'link' as const },
    and3: { strategy: 'text' as const, value: '(5), and', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'text' as const },
    httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4oNAAQ: { strategy: 'role' as const, value: 'Nancy Bauma', role: 'link', actionKind: 'link' as const },
    element3: { strategy: 'text' as const, value: '(4)', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'text' as const },
    highlightsFromTheQuarter: { strategy: 'text' as const, value: 'Highlights from the quarter:', actionKind: 'text' as const },
    advocacyInfluencedBookings333MArr: { strategy: 'text' as const, value: 'Advocacy-influenced bookings: $33.3M ARR (167', actionKind: 'text' as const },
    weEngaged248Insiders: { strategy: 'text' as const, value: 'We engaged 248 Insiders at five members-only', actionKind: 'text' as const },
    weSent531Insider: { strategy: 'text' as const, value: 'We sent 531 Insider gift offers (75% redeemed)', actionKind: 'text' as const },
    insidersParticipatedInMarketing: { strategy: 'text' as const, value: 'Insiders participated in marketing activities 90', actionKind: 'text' as const },
    insidersParticipatedIn288: { strategy: 'text' as const, value: 'Insiders participated in 288 feedback activities', actionKind: 'text' as const },
    allThingsSalesArchived: { strategy: 'text' as const, value: '@All Things Sales (Archived)​ @All Things Customer', actionKind: 'text' as const },
    commentsLikeCommentShare: { strategy: 'text' as const, value: '2 comments', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'generic' as const },
    seenBy34LikeCommentShare: { strategy: 'role' as const, value: 'Seen by 34', role: 'option', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'generic' as const },
    moreCommentsLikeCommentShare: { strategy: 'role' as const, value: 'More comments', role: 'button', shadowHost: 'lightning-button', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'button' as const },
    nancyBauma4Years: { strategy: 'text' as const, value: 'Nancy Bauma 4 years ago Actions for this Feed Item', actionKind: 'text' as const },
    stephenCahillHeyCool: { strategy: 'text' as const, value: '@Stephen Cahill​ Hey cool! Thanks for tagging me', actionKind: 'text' as const },
    stephenCahill: { strategy: 'role' as const, value: '@Stephen Cahill', role: 'link', actionKind: 'link' as const },
    heyCoolThanks: { strategy: 'text' as const, value: '​ Hey cool! Thanks for tagging me 🙂', actionKind: 'text' as const },
    lawrenceScofieldLikeComment: { strategy: 'text' as const, value: '02839042 — Lawrence Scofield to UKG Internal Only', scope: 'ol > li', scopeText: 'Like Comment', actionKind: 'text' as const },
    lawrenceScofieldLikeComment2: { strategy: 'role' as const, value: 'Lawrence Scofield', role: 'link', scope: 'ol > li', scopeText: 'Like Comment', actionKind: 'link' as const },
    exceptionalCustomerExperienceCx3: { strategy: 'text' as const, value: '@*Exceptional Customer Experience (CX)​', scope: 'ol > li', scopeText: 'Like Comment', actionKind: 'text' as const },
    isThereAWayLikeComment: { strategy: 'text' as const, value: 'Is there a way to expedite Milton Esquivel SFTP', scope: 'ol > li', scopeText: 'Like Comment', actionKind: 'text' as const },
    isThereAWay: { strategy: 'text' as const, value: 'Is there a way to expedite', scope: 'ol > li', scopeText: 'Like Comment', actionKind: 'text' as const },
    httpsKronosLightningForceComLightningR0036100001MjGXmAANView: { strategy: 'role' as const, value: 'Milton Esquivel', role: 'link', actionKind: 'link' as const },
    sftpAccountRequest: { strategy: 'text' as const, value: 'SFTP account request?', actionKind: 'text' as const },
    thankYouLikeComment: { strategy: 'text' as const, value: 'Thank You,', scope: 'ol > li', scopeText: 'Like Comment', actionKind: 'text' as const },
    larry: { strategy: 'text' as const, value: 'Larry', actionKind: 'text' as const },
    seenBy32LikeComment: { strategy: 'role' as const, value: 'Seen by 32', role: 'option', scope: 'ol > li', scopeText: 'Like Comment', actionKind: 'generic' as const },
    susanCharestLikeComment: { strategy: 'role' as const, value: 'Susan Charest', role: 'link', scope: 'ol > li', scopeText: 'Like Comment', actionKind: 'link' as const },
    exceptionalCustomerExperienceCx4: { strategy: 'text' as const, value: '*Exceptional Customer Experience (CX) — Juliana', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'text' as const },
    julianaVanAmsterdamLikeCommentShare: { strategy: 'role' as const, value: 'Juliana Van Amsterdam', role: 'link', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'link' as const },
    experienceOperationsInternalNewsletter: { strategy: 'text' as const, value: 'Experience Operations Internal Newsletter', actionKind: 'text' as const },
    theExperienceOperationsTeam: { strategy: 'text' as const, value: 'The Experience Operations team is happy to share', actionKind: 'text' as const },
    jennReaLikeCommentShare: { strategy: 'role' as const, value: '@Jenn Rea', role: 'link', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'link' as const },
    asOurFirst: { strategy: 'text' as const, value: '​ as our first Experience Operations Champion,', actionKind: 'text' as const },
    linkToOurNewsletterLikeCommentShare: { strategy: 'text' as const, value: 'Link to our Newsletter:', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'text' as const },
    weRecommendOpeningIn: { strategy: 'text' as const, value: '(we recommend opening in the Word app for the best', actionKind: 'text' as const },
    lynetteKenneyLikeCommentShare: { strategy: 'role' as const, value: '@Lynette Kenney', role: 'link', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'link' as const },
    devinShane: { strategy: 'role' as const, value: '@Devin Shane', role: 'link', actionKind: 'link' as const },
    nancyBurdzelLikeCommentShare: { strategy: 'role' as const, value: '@Nancy Burdzel', role: 'link', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'link' as const },
    susanPaugh: { strategy: 'role' as const, value: '@Susan Paugh', role: 'link', actionKind: 'link' as const },
    aliLyderNortonLikeCommentShare: { strategy: 'role' as const, value: '@Ali Lyder-norton', role: 'link', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'link' as const },
    bradleyChandler: { strategy: 'role' as const, value: '@Bradley Chandler', role: 'link', actionKind: 'link' as const },
    davidDownie: { strategy: 'role' as const, value: '@David Downie', role: 'link', actionKind: 'link' as const },
    allThingsMarketing: { strategy: 'role' as const, value: '@All Things Marketing', role: 'link', actionKind: 'link' as const },
    allThingsCloud: { strategy: 'role' as const, value: '@*All Things Cloud', role: 'link', actionKind: 'link' as const },
    allThingsIt: { strategy: 'role' as const, value: '@All Things IT', role: 'link', actionKind: 'link' as const },
    kronosSharepointComLikeCommentShare: { strategy: 'role' as const, value: 'kronos.sharepoint.com', role: 'link', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'link' as const },
    httpsKronosSharepointComWTCxOpsEXpPNVlYSFZMprYVzLDS2z4BGUWUirY57ve3Q6wJJo9wES8lnBgLikeCommentShare: { strategy: 'title' as const, value: 'https://kronos.sharepoint.com/:w:/t/CxOps/EXpPNVlYSFZMprYVzLDS2z4BGU-wUir-Y57ve3Q6wJJo9w?e=s8lnBg', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'link' as const },
    commentsLikeCommentShare2: { strategy: 'text' as const, value: '10 comments', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'generic' as const },
    seenBy30LikeCommentShare: { strategy: 'role' as const, value: 'Seen by 30', role: 'option', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'generic' as const },
    erinFord: { strategy: 'role' as const, value: 'Erin Ford', role: 'link', actionKind: 'link' as const },
    andreaChadis: { strategy: 'role' as const, value: 'Andrea Chadis', role: 'link', actionKind: 'link' as const },
    othersLikeCommentShare3: { strategy: 'role' as const, value: '12 others', role: 'link', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'link' as const },
    phyllisMerchant6Years: { strategy: 'text' as const, value: 'Phyllis Merchant 6 years ago Actions for this Feed', actionKind: 'text' as const },
    phyllisMerchantLikeCommentShare: { strategy: 'role' as const, value: 'Phyllis Merchant', role: 'link', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'link' as const },
    nancyBurdzelLooksGood: { strategy: 'text' as const, value: '@Nancy Burdzel Looks good! 😀', actionKind: 'text' as const },
    hiThere: { strategy: 'text' as const, value: 'Hi there!', actionKind: 'text' as const },
    itSBeenAFew: { strategy: 'text' as const, value: 'It’s been a few weeks since Sales Kickoff 2021, so', actionKind: 'text' as const },
    forFolksWhoWere: { strategy: 'text' as const, value: 'For folks who were unable to visit our booth or', actionKind: 'text' as const },
    migrationsSharePointSite: { strategy: 'text' as const, value: 'Migrations SharePoint site', actionKind: 'text' as const },
    migrationsSharePoint: { strategy: 'text' as const, value: 'Migrations SharePoint', actionKind: 'text' as const },
    httpsKronosSharepointComTeamsIndustrymarketingMigrations: { strategy: 'role' as const, value: 'site', role: 'link', actionKind: 'link' as const },
    migrationInsightsSalesforceFaq: { strategy: 'text' as const, value: 'Migration Insights Salesforce FAQ', actionKind: 'text' as const },
    migrationInsightsSalesforceLikeCommentShare: { strategy: 'text' as const, value: 'Migration Insights Salesforce', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'text' as const },
    httpsKronosSharepointComWRTeamsCxOpsLayouts15DocAspxSourcedoc7BDC0510DD06E04A86BD11F2731DFEAAF07DFileMigration20Insights20Salesforce20FAQDocxActionDefaultMobileredirectTrue20Web1Cid9c9e5ebeD5974e47B1a556b4cd142ef8: { strategy: 'role' as const, value: 'FAQ', role: 'link', actionKind: 'link' as const },
    migrationInsightsSalesforceOnePager: { strategy: 'text' as const, value: 'Migration Insights Salesforce One-Pager', actionKind: 'text' as const },
    httpsKronosSharepointComPRTeamsCxOpsLayouts15DocAspxSourcedoc7BAD69AC5798EE43ADB3C27895148D096A7DFileMigration20Insights20Salesforce20OnePager201PptxActionEditMobileredirectTrueWeb1CidCfa355b5C3f14cbaAf09C6a2872a02a5: { strategy: 'role' as const, value: 'One-Pager', role: 'link', actionKind: 'link' as const },
    migrationInsightsSalesforceTraining: { strategy: 'text' as const, value: 'Migration Insights Salesforce Training Video', actionKind: 'text' as const },
    httpsWebMicrosoftstreamComVideoC80f4f72F6834aa1977811a8d234f11cReferrerHttps2F2FkronosSharepointCom2F: { strategy: 'role' as const, value: 'Training Video', role: 'link', actionKind: 'link' as const },
    readyMadeMigrationInsightsSalesforce: { strategy: 'text' as const, value: 'Ready-made Migration Insights Salesforce Report', actionKind: 'text' as const },
    readyMadeMigrationInsights: { strategy: 'text' as const, value: 'Ready-made Migration Insights', actionKind: 'text' as const },
    httpsKronosLightningForceComLightningRReport00O4M0000045NuOUAUView: { strategy: 'role' as const, value: 'Salesforce Report', role: 'link', actionKind: 'link' as const },
    weReHereToHelpLikeCommentShare: { strategy: 'text' as const, value: 'We’re here to help! Feel free to reach out to', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'text' as const },
    migrationsUkgCom: { strategy: 'role' as const, value: 'Migrations@UKG.com', role: 'link', actionKind: 'link' as const },
    withYourQuestionsOr: { strategy: 'text' as const, value: 'with your questions or comments.', actionKind: 'text' as const },
    weLovedHearingFrom: { strategy: 'text' as const, value: 'We loved hearing from you and getting feedback on', actionKind: 'text' as const },
    johnKellyMattDowling: { strategy: 'text' as const, value: '@John Kelly​ @Matt Dowling​ @Ali Lyder-norton​', actionKind: 'text' as const },
    johnKelly: { strategy: 'role' as const, value: '@John Kelly', role: 'link', actionKind: 'link' as const },
    mattDowling: { strategy: 'role' as const, value: '@Matt Dowling', role: 'link', actionKind: 'link' as const },
    lisaPratt: { strategy: 'role' as const, value: '@Lisa Pratt', role: 'link', actionKind: 'link' as const },
    commentsLikeCommentShare3: { strategy: 'text' as const, value: '7 comments', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'generic' as const },
    seenBy24LikeCommentShare: { strategy: 'role' as const, value: 'Seen by 24', role: 'option', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'generic' as const },
    rachelGonzales: { strategy: 'role' as const, value: 'Rachel Gonzales', role: 'link', actionKind: 'link' as const },
    othersLikeCommentShare4: { strategy: 'role' as const, value: '6 others', role: 'link', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'link' as const },
    nancyBurdzel6Years: { strategy: 'text' as const, value: 'Nancy Burdzel 6 years ago Actions for this Feed', actionKind: 'text' as const },
    nancyBurdzelLikeCommentShare3: { strategy: 'role' as const, value: 'Nancy Burdzel', role: 'link', scope: 'ol > li', scopeText: 'Like Comment Share', actionKind: 'link' as const },
    bradVanAntwerpHere: { strategy: 'text' as const, value: '@Brad Van Antwerp​ here are some additional', actionKind: 'text' as const },
    bradVanAntwerp: { strategy: 'role' as const, value: '@Brad Van Antwerp', role: 'link', actionKind: 'link' as const },
    hereAreSome: { strategy: 'text' as const, value: '​ here are some additional resources related to', actionKind: 'text' as const },
    viewMorePosts: { strategy: 'role' as const, value: 'View More Posts', role: 'button', actionKind: 'button' as const },
    accountName: { strategy: 'text' as const, value: 'Account Name', actionKind: 'button' as const },
    loginField: { strategy: 'text' as const, value: 'Login field', actionKind: 'button' as const },
  } as const;

  readonly sldsTable1: WebTable; // columns: ["Item Number", "", "Sort Due Date Sorted Ascending Show Due Date Column Actions", "Sort Subject Show Subject Column Actions", "Sort Name Show Name Column Actions", "Sort Related To Show Related To Column Actions", "Sort UKG Activity Type Show UKG Activity Type Column Actions", "Sort Type Detail Show Type Detail Column Actions", "Sort Disposition Show Disposition Column Actions", "Sort Priority Show Priority Column Actions", "Sort Status Show Status Column Actions", "Sort Last Modified By Alias Show Last Modified By Alias Column Actions", "Action"]

  constructor(private readonly page: Page) {
    this.sldsTable1 = webTable(this.page, '#brandBand_2 table');
  }

  async clickOpenMenuItemSubmenu(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.openMenuItemSubmenu));
  }

  async expectOpenMenuItemSubmenuVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.openMenuItemSubmenu), timeoutMs, soft);
  }

  async clickOption(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.option));
  }

  async expectOptionVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.option), timeoutMs, soft);
  }

  async clickSkipToNavigation(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.skipToNavigation));
  }

  async expectSkipToNavigationVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.skipToNavigation), timeoutMs, soft);
  }

  async clickSkipToMainContent(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.skipToMainContent));
  }

  async expectSkipToMainContentVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.skipToMainContent), timeoutMs, soft);
  }

  async clickTogglePanel(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.togglePanel));
  }

  async doubleClickTogglePanel(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.togglePanel));
  }

  async expectTogglePanelVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.togglePanel), timeoutMs, soft);
  }

  async getInnerTextSandboxSdev(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.sandboxSdev));
  }

  async expectSandboxSdevVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.sandboxSdev), timeoutMs, soft);
  }

  async clickShowMenu(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.showMenu));
  }

  async doubleClickShowMenu(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.showMenu));
  }

  async expectShowMenuVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.showMenu), timeoutMs, soft);
  }

  async clickSearch(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.search));
  }

  async doubleClickSearch(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.search));
  }

  async expectSearchVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.search), timeoutMs, soft);
  }

  async clickAgentforce(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.agentforce));
  }

  async expectAgentforceVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.agentforce), timeoutMs, soft);
  }

  async clickThisItemDoesnTSupport(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.thisItemDoesnTSupport));
  }

  async expectThisItemDoesnTSupportVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.thisItemDoesnTSupport), timeoutMs, soft);
  }

  async clickThisItemDoesnTSupportButton(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.thisItemDoesnTSupportButton));
  }

  async doubleClickThisItemDoesnTSupportButton(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.thisItemDoesnTSupportButton));
  }

  async expectThisItemDoesnTSupportButtonVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.thisItemDoesnTSupportButton), timeoutMs, soft);
  }

  async clickFavoritesList(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.favoritesList));
  }

  async doubleClickFavoritesList(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.favoritesList));
  }

  async expectFavoritesListVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.favoritesList), timeoutMs, soft);
  }

  async clickGlobalActions(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.globalActions));
  }

  async expectGlobalActionsVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.globalActions), timeoutMs, soft);
  }

  async clickGuidanceCenter(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.guidanceCenter));
  }

  async expectGuidanceCenterVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.guidanceCenter), timeoutMs, soft);
  }

  async clickSalesforceHelp(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.salesforceHelp));
  }

  async expectSalesforceHelpVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.salesforceHelp), timeoutMs, soft);
  }

  async clickSetup(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.setup));
  }

  async expectSetupVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.setup), timeoutMs, soft);
  }

  async clickNotifications(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.notifications));
  }

  async expectNotificationsVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.notifications), timeoutMs, soft);
  }

  async clickViewProfile(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.viewProfile));
  }

  async expectViewProfileVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.viewProfile), timeoutMs, soft);
  }

  async clickAppLauncher(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.appLauncher));
  }

  async doubleClickAppLauncher(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.appLauncher));
  }

  async expectAppLauncherVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.appLauncher), timeoutMs, soft);
  }

  async getInnerTextSalesforceCpqLightning(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.salesforceCpqLightning));
  }

  async expectSalesforceCpqLightningVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.salesforceCpqLightning), timeoutMs, soft);
  }

  async clickHome(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.home));
  }

  async expectHomeVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.home), timeoutMs, soft);
  }

  async clickAccounts(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.accounts));
  }

  async expectAccountsVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.accounts), timeoutMs, soft);
  }

  async clickAccountsList(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.accountsList));
  }

  async expectAccountsListVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.accountsList), timeoutMs, soft);
  }

  async clickOpportunities(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.opportunities));
  }

  async expectOpportunitiesVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.opportunities), timeoutMs, soft);
  }

  async clickOpportunitiesList(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.opportunitiesList));
  }

  async expectOpportunitiesListVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.opportunitiesList), timeoutMs, soft);
  }

  async clickQuotes(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.quotes));
  }

  async expectQuotesVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.quotes), timeoutMs, soft);
  }

  async clickQuotesList(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.quotesList));
  }

  async expectQuotesListVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.quotesList), timeoutMs, soft);
  }

  async clickQuoteTerms(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.quoteTerms));
  }

  async expectQuoteTermsVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.quoteTerms), timeoutMs, soft);
  }

  async clickQuoteTermsList(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.quoteTermsList));
  }

  async expectQuoteTermsListVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.quoteTermsList), timeoutMs, soft);
  }

  async clickOrders(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.orders));
  }

  async expectOrdersVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.orders), timeoutMs, soft);
  }

  async clickOrdersList(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.ordersList));
  }

  async expectOrdersListVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.ordersList), timeoutMs, soft);
  }

  async clickUnableToLoad(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.unableToLoad));
  }

  async expectUnableToLoadVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.unableToLoad), timeoutMs, soft);
  }

  async clickUnableToLoadList(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.unableToLoadList));
  }

  async expectUnableToLoadListVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.unableToLoadList), timeoutMs, soft);
  }

  async clickCloseTab(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.closeTab));
  }

  async doubleClickCloseTab(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.closeTab));
  }

  async expectCloseTabVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.closeTab), timeoutMs, soft);
  }

  async clickMoreShowMoreNavigation(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.moreShowMoreNavigation));
  }

  async expectMoreShowMoreNavigationVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.moreShowMoreNavigation), timeoutMs, soft);
  }

  async clickPersonalizeYourNavBar(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.personalizeYourNavBar));
  }

  async doubleClickPersonalizeYourNavBar(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.personalizeYourNavBar));
  }

  async expectPersonalizeYourNavBarVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.personalizeYourNavBar), timeoutMs, soft);
  }

  async getInnerTextTasks(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.tasks));
  }

  async expectTasksVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.tasks), timeoutMs, soft);
  }

  async clickMyOpenTasksEditable(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.myOpenTasksEditable));
  }

  async expectMyOpenTasksEditableVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.myOpenTasksEditable), timeoutMs, soft);
  }

  async clickNewTask(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.newTask));
  }

  async expectNewTaskVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.newTask), timeoutMs, soft);
  }

  async clickAssignLabel(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.assignLabel));
  }

  async expectAssignLabelVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.assignLabel), timeoutMs, soft);
  }

  async getInnerTextItemsSorted(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.itemsSorted));
  }

  async expectItemsSortedVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.itemsSorted), timeoutMs, soft);
  }

  async getInnerTextUpdatedAMinuteAgo(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.updatedAMinuteAgo));
  }

  async expectUpdatedAMinuteAgoVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.updatedAMinuteAgo), timeoutMs, soft);
  }

  async fillSearchThisList(value: string): Promise<void> {
    await fillWhenVisible(webLocator(this.page, HomePage.L.searchThisList), value);
  }

  async clearSearchThisList(): Promise<void> {
    await clearWhenVisible(webLocator(this.page, HomePage.L.searchThisList));
  }

  async getSearchThisListValue(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.searchThisList));
  }

  async expectSearchThisListVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.searchThisList), timeoutMs, soft);
  }

  async clickListViewControls(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.listViewControls));
  }

  async doubleClickListViewControls(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.listViewControls));
  }

  async expectListViewControlsVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.listViewControls), timeoutMs, soft);
  }

  async clickRefreshButton(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.refreshButton));
  }

  async doubleClickRefreshButton(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.refreshButton));
  }

  async expectRefreshButtonVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.refreshButton), timeoutMs, soft);
  }

  async clickInlineEditButton(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.inlineEditButton));
  }

  async doubleClickInlineEditButton(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.inlineEditButton));
  }

  async expectInlineEditButtonVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.inlineEditButton), timeoutMs, soft);
  }

  async clickSortDueDate(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.sortDueDate));
  }

  async expectSortDueDateVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.sortDueDate), timeoutMs, soft);
  }

  async clickShowDueDateColumn(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.showDueDateColumn));
  }

  async doubleClickShowDueDateColumn(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.showDueDateColumn));
  }

  async expectShowDueDateColumnVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.showDueDateColumn), timeoutMs, soft);
  }

  async clickDueDateColumnWidth(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.dueDateColumnWidth));
  }

  async expectDueDateColumnWidthVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.dueDateColumnWidth), timeoutMs, soft);
  }

  async clickSortSubject(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.sortSubject));
  }

  async expectSortSubjectVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.sortSubject), timeoutMs, soft);
  }

  async clickShowSubjectColumnActions(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.showSubjectColumnActions));
  }

  async doubleClickShowSubjectColumnActions(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.showSubjectColumnActions));
  }

  async expectShowSubjectColumnActionsVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.showSubjectColumnActions), timeoutMs, soft);
  }

  async clickSubjectColumnWidth(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.subjectColumnWidth));
  }

  async expectSubjectColumnWidthVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.subjectColumnWidth), timeoutMs, soft);
  }

  async clickSortName(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.sortName));
  }

  async expectSortNameVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.sortName), timeoutMs, soft);
  }

  async clickShowNameColumnActions(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.showNameColumnActions));
  }

  async doubleClickShowNameColumnActions(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.showNameColumnActions));
  }

  async expectShowNameColumnActionsVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.showNameColumnActions), timeoutMs, soft);
  }

  async clickNameColumnWidth(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.nameColumnWidth));
  }

  async expectNameColumnWidthVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.nameColumnWidth), timeoutMs, soft);
  }

  async clickSortRelatedTo(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.sortRelatedTo));
  }

  async expectSortRelatedToVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.sortRelatedTo), timeoutMs, soft);
  }

  async clickShowRelatedToColumn(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.showRelatedToColumn));
  }

  async doubleClickShowRelatedToColumn(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.showRelatedToColumn));
  }

  async expectShowRelatedToColumnVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.showRelatedToColumn), timeoutMs, soft);
  }

  async clickRelatedToColumnWidth(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.relatedToColumnWidth));
  }

  async expectRelatedToColumnWidthVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.relatedToColumnWidth), timeoutMs, soft);
  }

  async clickSortUkgActivityType(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.sortUkgActivityType));
  }

  async expectSortUkgActivityTypeVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.sortUkgActivityType), timeoutMs, soft);
  }

  async clickShowUkgActivityType(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.showUkgActivityType));
  }

  async doubleClickShowUkgActivityType(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.showUkgActivityType));
  }

  async expectShowUkgActivityTypeVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.showUkgActivityType), timeoutMs, soft);
  }

  async clickUkgActivityTypeColumn(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.ukgActivityTypeColumn));
  }

  async expectUkgActivityTypeColumnVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.ukgActivityTypeColumn), timeoutMs, soft);
  }

  async clickSortTypeDetail(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.sortTypeDetail));
  }

  async expectSortTypeDetailVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.sortTypeDetail), timeoutMs, soft);
  }

  async clickShowTypeDetailColumn(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.showTypeDetailColumn));
  }

  async doubleClickShowTypeDetailColumn(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.showTypeDetailColumn));
  }

  async expectShowTypeDetailColumnVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.showTypeDetailColumn), timeoutMs, soft);
  }

  async clickTypeDetailColumnWidth(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.typeDetailColumnWidth));
  }

  async expectTypeDetailColumnWidthVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.typeDetailColumnWidth), timeoutMs, soft);
  }

  async clickSortDisposition(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.sortDisposition));
  }

  async expectSortDispositionVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.sortDisposition), timeoutMs, soft);
  }

  async clickShowDispositionColumnActions(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.showDispositionColumnActions));
  }

  async doubleClickShowDispositionColumnActions(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.showDispositionColumnActions));
  }

  async expectShowDispositionColumnActionsVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.showDispositionColumnActions), timeoutMs, soft);
  }

  async clickDispositionColumnWidth(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.dispositionColumnWidth));
  }

  async expectDispositionColumnWidthVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.dispositionColumnWidth), timeoutMs, soft);
  }

  async clickSortPriority(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.sortPriority));
  }

  async expectSortPriorityVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.sortPriority), timeoutMs, soft);
  }

  async clickShowPriorityColumnActions(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.showPriorityColumnActions));
  }

  async doubleClickShowPriorityColumnActions(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.showPriorityColumnActions));
  }

  async expectShowPriorityColumnActionsVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.showPriorityColumnActions), timeoutMs, soft);
  }

  async clickPriorityColumnWidth(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.priorityColumnWidth));
  }

  async expectPriorityColumnWidthVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.priorityColumnWidth), timeoutMs, soft);
  }

  async clickSortStatus(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.sortStatus));
  }

  async expectSortStatusVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.sortStatus), timeoutMs, soft);
  }

  async clickShowStatusColumnActions(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.showStatusColumnActions));
  }

  async doubleClickShowStatusColumnActions(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.showStatusColumnActions));
  }

  async expectShowStatusColumnActionsVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.showStatusColumnActions), timeoutMs, soft);
  }

  async clickStatusColumnWidth(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.statusColumnWidth));
  }

  async expectStatusColumnWidthVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.statusColumnWidth), timeoutMs, soft);
  }

  async clickSortLastModifiedBy(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.sortLastModifiedBy));
  }

  async expectSortLastModifiedByVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.sortLastModifiedBy), timeoutMs, soft);
  }

  async clickShowLastModifiedBy(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.showLastModifiedBy));
  }

  async doubleClickShowLastModifiedBy(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.showLastModifiedBy));
  }

  async expectShowLastModifiedByVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.showLastModifiedBy), timeoutMs, soft);
  }

  async clickLastModifiedByAlias(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.lastModifiedByAlias));
  }

  async expectLastModifiedByAliasVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.lastModifiedByAlias), timeoutMs, soft);
  }

  async getInnerTextNoItemsToDisplay(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.noItemsToDisplay));
  }

  async expectNoItemsToDisplayVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.noItemsToDisplay), timeoutMs, soft);
  }

  async getInnerTextHomeCardHeader6140(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.homeCardHeader6140));
  }

  async expectHomeCardHeader6140Visible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.homeCardHeader6140), timeoutMs, soft);
  }

  async clickNagalingaBKammar(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.nagalingaBKammar));
  }

  async expectNagalingaBKammarVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.nagalingaBKammar), timeoutMs, soft);
  }

  async clickAshishBhasin(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.ashishBhasin));
  }

  async expectAshishBhasinVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.ashishBhasin), timeoutMs, soft);
  }

  async clickOperatingUnit(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.operatingUnit));
  }

  async expectOperatingUnitVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.operatingUnit), timeoutMs, soft);
  }

  async clickKronosUsOu(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.kronosUsOu));
  }

  async expectKronosUsOuVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.kronosUsOu), timeoutMs, soft);
  }

  async clickOrder(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.order));
  }

  async expectOrderVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.order), timeoutMs, soft);
  }

  async clickParulGajbhiye(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.parulGajbhiye));
  }

  async expectParulGajbhiyeVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.parulGajbhiye), timeoutMs, soft);
  }

  async clickViewAllRecentRecords(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.viewAllRecentRecords));
  }

  async expectViewAllRecentRecordsVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.viewAllRecentRecords), timeoutMs, soft);
  }

  async clickPost(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.post));
  }

  async expectPostVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.post), timeoutMs, soft);
  }

  async clickPostTab(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.postTab));
  }

  async expectPostTabVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.postTab), timeoutMs, soft);
  }

  async clickShareAnUpdate(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.shareAnUpdate));
  }

  async doubleClickShareAnUpdate(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.shareAnUpdate));
  }

  async expectShareAnUpdateVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.shareAnUpdate), timeoutMs, soft);
  }

  async clickShare(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.share));
  }

  async doubleClickShare(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.share));
  }

  async expectShareVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.share), timeoutMs, soft);
  }

  async clickSortBy(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.sortBy));
  }

  async doubleClickSortBy(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.sortBy));
  }

  async expectSortByVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.sortBy), timeoutMs, soft);
  }

  async fillSearchThisFeed(value: string): Promise<void> {
    await fillWhenVisible(webLocator(this.page, HomePage.L.searchThisFeed), value);
  }

  async clearSearchThisFeed(): Promise<void> {
    await clearWhenVisible(webLocator(this.page, HomePage.L.searchThisFeed));
  }

  async getSearchThisFeedValue(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.searchThisFeed));
  }

  async expectSearchThisFeedVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.searchThisFeed), timeoutMs, soft);
  }

  async clickFilterFeed(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.filterFeed));
  }

  async doubleClickFilterFeed(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.filterFeed));
  }

  async expectFilterFeedVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.filterFeed), timeoutMs, soft);
  }

  async clickRefreshThisFeed(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.refreshThisFeed));
  }

  async doubleClickRefreshThisFeed(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.refreshThisFeed));
  }

  async expectRefreshThisFeedVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.refreshThisFeed), timeoutMs, soft);
  }

  async clickSkipFeed(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.skipFeed));
  }

  async expectSkipFeedVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.skipFeed), timeoutMs, soft);
  }

  async clickShaneAndersonLikeCommentShare(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.shaneAndersonLikeCommentShare));
  }

  async expectShaneAndersonLikeCommentShareVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.shaneAndersonLikeCommentShare), timeoutMs, soft);
  }

  async clickActionsForThisFeedLikeCommentShare(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.actionsForThisFeedLikeCommentShare));
  }

  async doubleClickActionsForThisFeedLikeCommentShare(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.actionsForThisFeedLikeCommentShare));
  }

  async expectActionsForThisFeedLikeCommentShareVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.actionsForThisFeedLikeCommentShare), timeoutMs, soft);
  }

  async getInnerTextHiAllFromPrint(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.hiAllFromPrint));
  }

  async expectHiAllFromPrintVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.hiAllFromPrint), timeoutMs, soft);
  }

  async getInnerTextFedExHasPostedThe(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.fedExHasPostedThe));
  }

  async expectFedExHasPostedTheVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.fedExHasPostedThe), timeoutMs, soft);
  }

  async clickHttpsWwwFedexComEnUsServiceAlertsHtmlLikeCommentShare(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.httpsWwwFedexComEnUsServiceAlertsHtmlLikeCommentShare));
  }

  async expectHttpsWwwFedexComEnUsServiceAlertsHtmlLikeCommentShareVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.httpsWwwFedexComEnUsServiceAlertsHtmlLikeCommentShare), timeoutMs, soft);
  }

  async getInnerTextWinterStormAdvisory(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.winterStormAdvisory));
  }

  async expectWinterStormAdvisoryVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.winterStormAdvisory), timeoutMs, soft);
  }

  async getInnerTextForSpecificShipmentStatusLikeCommentShare(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.forSpecificShipmentStatusLikeCommentShare));
  }

  async expectForSpecificShipmentStatusLikeCommentShareVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.forSpecificShipmentStatusLikeCommentShare), timeoutMs, soft);
  }

  async clickHttpsWwwFedexComEnUsTrackingCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.httpsWwwFedexComEnUsTrackingCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326));
  }

  async expectHttpsWwwFedexComEnUsTrackingCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326Visible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.httpsWwwFedexComEnUsTrackingCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326), timeoutMs, soft);
  }

  async getInnerTextYourShipmentAt(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.yourShipmentAt));
  }

  async expectYourShipmentAtVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.yourShipmentAt), timeoutMs, soft);
  }

  async clickFedexCom(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.fedexCom));
  }

  async expectFedexComVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.fedexCom), timeoutMs, soft);
  }

  async getInnerTextResidentialRecipientsCan(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.residentialRecipientsCan));
  }

  async expectResidentialRecipientsCanVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.residentialRecipientsCan), timeoutMs, soft);
  }

  async clickHttpsWwwFedexComEnUsDeliveryManagerHtmlCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.httpsWwwFedexComEnUsDeliveryManagerHtmlCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326));
  }

  async expectHttpsWwwFedexComEnUsDeliveryManagerHtmlCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326Visible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.httpsWwwFedexComEnUsDeliveryManagerHtmlCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326), timeoutMs, soft);
  }

  async getInnerTextToStayInformedOf(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.toStayInformedOf));
  }

  async expectToStayInformedOfVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.toStayInformedOf), timeoutMs, soft);
  }

  async getInnerTextThankYouExceptionalCustomer(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.thankYouExceptionalCustomer));
  }

  async expectThankYouExceptionalCustomerVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.thankYouExceptionalCustomer), timeoutMs, soft);
  }

  async getInnerTextThankYouLikeCommentShare(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.thankYouLikeCommentShare));
  }

  async expectThankYouLikeCommentShareVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.thankYouLikeCommentShare), timeoutMs, soft);
  }

  async clickExceptionalCustomerExperienceCxLikeCommentShare(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCxLikeCommentShare));
  }

  async expectExceptionalCustomerExperienceCxLikeCommentShareVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCxLikeCommentShare), timeoutMs, soft);
  }

  async clickCCManagedServices(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.cCManagedServices));
  }

  async expectCCManagedServicesVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.cCManagedServices), timeoutMs, soft);
  }

  async clickShowMoreTextLikeCommentShare(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.showMoreTextLikeCommentShare));
  }

  async expectShowMoreTextLikeCommentShareVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.showMoreTextLikeCommentShare), timeoutMs, soft);
  }

  async clickWwwFedexComLikeCommentShare(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.wwwFedexComLikeCommentShare));
  }

  async expectWwwFedexComLikeCommentShareVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.wwwFedexComLikeCommentShare), timeoutMs, soft);
  }

  async clickLikeLikeCommentShare(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.likeLikeCommentShare));
  }

  async expectLikeLikeCommentShareVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.likeLikeCommentShare), timeoutMs, soft);
  }

  async clickCommentLikeCommentShare(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.commentLikeCommentShare));
  }

  async expectCommentLikeCommentShareVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.commentLikeCommentShare), timeoutMs, soft);
  }

  async clickSeenBy149LikeCommentShare(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.seenBy149LikeCommentShare));
  }

  async expectSeenBy149LikeCommentShareVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.seenBy149LikeCommentShare), timeoutMs, soft);
  }

  async getInnerTextLikesThisLikeCommentShare(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.likesThisLikeCommentShare));
  }

  async expectLikesThisLikeCommentShareVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.likesThisLikeCommentShare), timeoutMs, soft);
  }

  async clickSusanWescott(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.susanWescott));
  }

  async expectSusanWescottVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.susanWescott), timeoutMs, soft);
  }

  async fillInput271(value: string): Promise<void> {
    await fillWhenVisible(webLocator(this.page, HomePage.L.input271), value);
  }

  async clearInput271(): Promise<void> {
    await clearWhenVisible(webLocator(this.page, HomePage.L.input271));
  }

  async getInput271Value(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.input271));
  }

  async expectInput271Visible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.input271), timeoutMs, soft);
  }

  async getInnerTextExceptionalCustomerExperienceCxNoteTest(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCxNoteTest));
  }

  async expectExceptionalCustomerExperienceCxNoteTestVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCxNoteTest), timeoutMs, soft);
  }

  async clickExceptionalCustomerExperienceCxNoteTest2(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCxNoteTest2));
  }

  async expectExceptionalCustomerExperienceCxNoteTest2Visible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCxNoteTest2), timeoutMs, soft);
  }

  async clickJanaHam(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.janaHam));
  }

  async expectJanaHamVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.janaHam), timeoutMs, soft);
  }

  async getInnerTextTestNoteTest(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.testNoteTest));
  }

  async expectTestNoteTestVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.testNoteTest), timeoutMs, soft);
  }

  async getInnerTextNoteTestNoteTest(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.noteTestNoteTest));
  }

  async expectNoteTestNoteTestVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.noteTestNoteTest), timeoutMs, soft);
  }

  async clickViewFileTest(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.viewFileTest));
  }

  async expectViewFileTestVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.viewFileTest), timeoutMs, soft);
  }

  async clickSeenBy113NoteTest(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.seenBy113NoteTest));
  }

  async expectSeenBy113NoteTestVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.seenBy113NoteTest), timeoutMs, soft);
  }

  async clickLaurenMoodie(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.laurenMoodie));
  }

  async expectLaurenMoodieVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.laurenMoodie), timeoutMs, soft);
  }

  async getInnerTextRonaldLoftonLikeComment(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.ronaldLoftonLikeComment));
  }

  async expectRonaldLoftonLikeCommentVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.ronaldLoftonLikeComment), timeoutMs, soft);
  }

  async clickRonaldLoftonLikeComment2(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.ronaldLoftonLikeComment2));
  }

  async expectRonaldLoftonLikeComment2Visible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.ronaldLoftonLikeComment2), timeoutMs, soft);
  }

  async getInnerTextToUkgInternalOnlyLikeComment(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.toUkgInternalOnlyLikeComment));
  }

  async expectToUkgInternalOnlyLikeCommentVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.toUkgInternalOnlyLikeComment), timeoutMs, soft);
  }

  async getInnerTextHiExceptionalCustomerExperience(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.hiExceptionalCustomerExperience));
  }

  async expectHiExceptionalCustomerExperienceVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.hiExceptionalCustomerExperience), timeoutMs, soft);
  }

  async getInnerTextHi(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.hi));
  }

  async expectHiVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.hi), timeoutMs, soft);
  }

  async getInnerTextCanYouPlease(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.canYouPlease));
  }

  async expectCanYouPleaseVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.canYouPlease), timeoutMs, soft);
  }

  async clickCommentLikeComment3(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.commentLikeComment3));
  }

  async expectCommentLikeComment3Visible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.commentLikeComment3), timeoutMs, soft);
  }

  async clickSeenBy52LikeComment(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.seenBy52LikeComment));
  }

  async expectSeenBy52LikeCommentVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.seenBy52LikeComment), timeoutMs, soft);
  }

  async getInnerTextGouravSharma2Years(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.gouravSharma2Years));
  }

  async expectGouravSharma2YearsVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.gouravSharma2Years), timeoutMs, soft);
  }

  async clickGouravSharmaLikeComment(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.gouravSharmaLikeComment));
  }

  async expectGouravSharmaLikeCommentVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.gouravSharmaLikeComment), timeoutMs, soft);
  }

  async clickActionsForThisFeedLikeComment2(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.actionsForThisFeedLikeComment2));
  }

  async doubleClickActionsForThisFeedLikeComment2(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.actionsForThisFeedLikeComment2));
  }

  async expectActionsForThisFeedLikeComment2Visible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.actionsForThisFeedLikeComment2), timeoutMs, soft);
  }

  async getInnerTextHiRonaldIfYou(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.hiRonaldIfYou));
  }

  async expectHiRonaldIfYouVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.hiRonaldIfYou), timeoutMs, soft);
  }

  async clickShowLikes(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.showLikes));
  }

  async doubleClickShowLikes(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.showLikes));
  }

  async expectShowLikesVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.showLikes), timeoutMs, soft);
  }

  async getInnerTextExceptionalCustomerExperienceCx(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCx));
  }

  async expectExceptionalCustomerExperienceCxVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCx), timeoutMs, soft);
  }

  async clickEricaDriverLikeCommentShare(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.ericaDriverLikeCommentShare));
  }

  async expectEricaDriverLikeCommentShareVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.ericaDriverLikeCommentShare), timeoutMs, soft);
  }

  async getInnerTextCustomerAdvocacyInsidersFY22(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.customerAdvocacyInsidersFY22));
  }

  async expectCustomerAdvocacyInsidersFY22Visible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.customerAdvocacyInsidersFY22), timeoutMs, soft);
  }

  async clickHttpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v86HQAQ(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v86HQAQ));
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v86HQAQVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v86HQAQ), timeoutMs, soft);
  }

  async getInnerTextFY22Q2Highlights(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.fY22Q2Highlights));
  }

  async expectFY22Q2HighlightsVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.fY22Q2Highlights), timeoutMs, soft);
  }

  async getInnerTextAdvocacyInfluencedBookings385MArr(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.advocacyInfluencedBookings385MArr));
  }

  async expectAdvocacyInfluencedBookings385MArrVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.advocacyInfluencedBookings385MArr), timeoutMs, soft);
  }

  async getInnerTextRelationshipManagementChunHarvey(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.relationshipManagementChunHarvey));
  }

  async expectRelationshipManagementChunHarveyVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.relationshipManagementChunHarvey), timeoutMs, soft);
  }

  async getInnerTextRelationshipManagementLikeCommentShare(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.relationshipManagementLikeCommentShare));
  }

  async expectRelationshipManagementLikeCommentShareVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.relationshipManagementLikeCommentShare), timeoutMs, soft);
  }

  async clickHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r63MAAQ(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r63MAAQ));
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r63MAAQVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r63MAAQ), timeoutMs, soft);
  }

  async clickHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006mcQBAAY(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006mcQBAAY));
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006mcQBAAYVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006mcQBAAY), timeoutMs, soft);
  }

  async getInnerTextAndLikeCommentShare(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.andLikeCommentShare));
  }

  async expectAndLikeCommentShareVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.andLikeCommentShare), timeoutMs, soft);
  }

  async clickHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006rOQfAAM(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006rOQfAAM));
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006rOQfAAMVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006rOQfAAM), timeoutMs, soft);
  }

  async getInnerTextSalesKimCalhounChrissi(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.salesKimCalhounChrissi));
  }

  async expectSalesKimCalhounChrissiVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.salesKimCalhounChrissi), timeoutMs, soft);
  }

  async getInnerTextSalesLikeCommentShare(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.salesLikeCommentShare));
  }

  async expectSalesLikeCommentShareVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.salesLikeCommentShare), timeoutMs, soft);
  }

  async clickHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4I2AAI(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4I2AAI));
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4I2AAIVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4I2AAI), timeoutMs, soft);
  }

  async clickHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4apAAA(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4apAAA));
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4apAAAVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4apAAA), timeoutMs, soft);
  }

  async clickHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000007JXOfAAO(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000007JXOfAAO));
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000007JXOfAAOVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000007JXOfAAO), timeoutMs, soft);
  }

  async getInnerTextInsidersParticipatedIn107(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.insidersParticipatedIn107));
  }

  async expectInsidersParticipatedIn107Visible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.insidersParticipatedIn107), timeoutMs, soft);
  }

  async getInnerTextWeSent202Insider(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.weSent202Insider));
  }

  async expectWeSent202InsiderVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.weSent202Insider), timeoutMs, soft);
  }

  async getInnerTextInsidersParticipatedIn79(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.insidersParticipatedIn79));
  }

  async expectInsidersParticipatedIn79Visible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.insidersParticipatedIn79), timeoutMs, soft);
  }

  async getInnerTextGotQuestionsReachOutLikeCommentShare(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.gotQuestionsReachOutLikeCommentShare));
  }

  async expectGotQuestionsReachOutLikeCommentShareVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.gotQuestionsReachOutLikeCommentShare), timeoutMs, soft);
  }

  async clickInsidersUkgComLikeCommentShare(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.insidersUkgComLikeCommentShare));
  }

  async expectInsidersUkgComLikeCommentShareVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.insidersUkgComLikeCommentShare), timeoutMs, soft);
  }

  async getInnerTextLindaZavatskyCarlyStorie(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.lindaZavatskyCarlyStorie));
  }

  async expectLindaZavatskyCarlyStorieVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.lindaZavatskyCarlyStorie), timeoutMs, soft);
  }

  async clickLindaZavatsky(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.lindaZavatsky));
  }

  async expectLindaZavatskyVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.lindaZavatsky), timeoutMs, soft);
  }

  async clickCarlyStorie(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.carlyStorie));
  }

  async expectCarlyStorieVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.carlyStorie), timeoutMs, soft);
  }

  async clickKimberlyCalhoun(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.kimberlyCalhoun));
  }

  async expectKimberlyCalhounVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.kimberlyCalhoun), timeoutMs, soft);
  }

  async clickAllThingsSalesLikeCommentShare(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.allThingsSalesLikeCommentShare));
  }

  async expectAllThingsSalesLikeCommentShareVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.allThingsSalesLikeCommentShare), timeoutMs, soft);
  }

  async getInnerTextArchivedLikeCommentShare(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.archivedLikeCommentShare));
  }

  async expectArchivedLikeCommentShareVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.archivedLikeCommentShare), timeoutMs, soft);
  }

  async clickAllThingsCustomerSuccessLikeCommentShare(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.allThingsCustomerSuccessLikeCommentShare));
  }

  async expectAllThingsCustomerSuccessLikeCommentShareVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.allThingsCustomerSuccessLikeCommentShare), timeoutMs, soft);
  }

  async clickAllThingsServicesLikeCommentShare(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.allThingsServicesLikeCommentShare));
  }

  async expectAllThingsServicesLikeCommentShareVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.allThingsServicesLikeCommentShare), timeoutMs, soft);
  }

  async clickSeenBy40LikeCommentShare(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.seenBy40LikeCommentShare));
  }

  async expectSeenBy40LikeCommentShareVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.seenBy40LikeCommentShare), timeoutMs, soft);
  }

  async getInnerTextAndLikeLikeCommentShare(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.andLikeLikeCommentShare));
  }

  async expectAndLikeLikeCommentShareVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.andLikeLikeCommentShare), timeoutMs, soft);
  }

  async clickOpalWagnac(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.opalWagnac));
  }

  async expectOpalWagnacVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.opalWagnac), timeoutMs, soft);
  }

  async clickOrielSilvaLikeCommentShare(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.orielSilvaLikeCommentShare));
  }

  async expectOrielSilvaLikeCommentShareVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.orielSilvaLikeCommentShare), timeoutMs, soft);
  }

  async clickOthersLikeCommentShare(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.othersLikeCommentShare));
  }

  async expectOthersLikeCommentShareVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.othersLikeCommentShare), timeoutMs, soft);
  }

  async getInnerTextCustomerAdvocacyInsidersTeam(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.customerAdvocacyInsidersTeam));
  }

  async expectCustomerAdvocacyInsidersTeamVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.customerAdvocacyInsidersTeam), timeoutMs, soft);
  }

  async getInnerTextWeVePublishedOurCustomer(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.weVePublishedOurCustomer));
  }

  async expectWeVePublishedOurCustomerVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.weVePublishedOurCustomer), timeoutMs, soft);
  }

  async getInnerTextWeVePublishedOur(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.weVePublishedOur));
  }

  async expectWeVePublishedOurVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.weVePublishedOur), timeoutMs, soft);
  }

  async clickHttpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v61ZQAQ(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v61ZQAQ));
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v61ZQAQVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v61ZQAQ), timeoutMs, soft);
  }

  async getInnerTextHugeGiantThanksTo(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.hugeGiantThanksTo));
  }

  async expectHugeGiantThanksToVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.hugeGiantThanksTo), timeoutMs, soft);
  }

  async getInnerTextHugeGiant(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.hugeGiant));
  }

  async expectHugeGiantVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.hugeGiant), timeoutMs, soft);
  }

  async getInnerTextThanksToOurTop(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.thanksToOurTop));
  }

  async expectThanksToOurTopVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.thanksToOurTop), timeoutMs, soft);
  }

  async getInnerTextRelationshipManagementMicheleBronder(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.relationshipManagementMicheleBronder));
  }

  async expectRelationshipManagementMicheleBronderVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.relationshipManagementMicheleBronder), timeoutMs, soft);
  }

  async clickHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6imAAA(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6imAAA));
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6imAAAVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6imAAA), timeoutMs, soft);
  }

  async getInnerTextElementLikeCommentShare(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.elementLikeCommentShare));
  }

  async expectElementLikeCommentShareVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.elementLikeCommentShare), timeoutMs, soft);
  }

  async clickHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r5zKAAQ(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r5zKAAQ));
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r5zKAAQVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r5zKAAQ), timeoutMs, soft);
  }

  async getInnerTextAnd2(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.and2));
  }

  async expectAnd2Visible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.and2), timeoutMs, soft);
  }

  async clickHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r773AAA(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r773AAA));
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r773AAAVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r773AAA), timeoutMs, soft);
  }

  async getInnerTextElement(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.element));
  }

  async expectElementVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.element), timeoutMs, soft);
  }

  async getInnerTextSalesMollyBondellio13(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.salesMollyBondellio13));
  }

  async expectSalesMollyBondellio13Visible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.salesMollyBondellio13), timeoutMs, soft);
  }

  async clickHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6jYAAQ(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6jYAAQ));
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6jYAAQVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6jYAAQ), timeoutMs, soft);
  }

  async getInnerTextElement2(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.element2));
  }

  async expectElement2Visible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.element2), timeoutMs, soft);
  }

  async clickHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r66fAAA(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r66fAAA));
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r66fAAAVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r66fAAA), timeoutMs, soft);
  }

  async getInnerTextAnd3(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.and3));
  }

  async expectAnd3Visible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.and3), timeoutMs, soft);
  }

  async clickHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4oNAAQ(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4oNAAQ));
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4oNAAQVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4oNAAQ), timeoutMs, soft);
  }

  async getInnerTextElement3(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.element3));
  }

  async expectElement3Visible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.element3), timeoutMs, soft);
  }

  async getInnerTextHighlightsFromTheQuarter(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.highlightsFromTheQuarter));
  }

  async expectHighlightsFromTheQuarterVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.highlightsFromTheQuarter), timeoutMs, soft);
  }

  async getInnerTextAdvocacyInfluencedBookings333MArr(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.advocacyInfluencedBookings333MArr));
  }

  async expectAdvocacyInfluencedBookings333MArrVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.advocacyInfluencedBookings333MArr), timeoutMs, soft);
  }

  async getInnerTextWeEngaged248Insiders(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.weEngaged248Insiders));
  }

  async expectWeEngaged248InsidersVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.weEngaged248Insiders), timeoutMs, soft);
  }

  async getInnerTextWeSent531Insider(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.weSent531Insider));
  }

  async expectWeSent531InsiderVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.weSent531Insider), timeoutMs, soft);
  }

  async getInnerTextInsidersParticipatedInMarketing(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.insidersParticipatedInMarketing));
  }

  async expectInsidersParticipatedInMarketingVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.insidersParticipatedInMarketing), timeoutMs, soft);
  }

  async getInnerTextInsidersParticipatedIn288(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.insidersParticipatedIn288));
  }

  async expectInsidersParticipatedIn288Visible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.insidersParticipatedIn288), timeoutMs, soft);
  }

  async getInnerTextAllThingsSalesArchived(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.allThingsSalesArchived));
  }

  async expectAllThingsSalesArchivedVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.allThingsSalesArchived), timeoutMs, soft);
  }

  async clickCommentsLikeCommentShare(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.commentsLikeCommentShare));
  }

  async expectCommentsLikeCommentShareVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.commentsLikeCommentShare), timeoutMs, soft);
  }

  async clickSeenBy34LikeCommentShare(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.seenBy34LikeCommentShare));
  }

  async expectSeenBy34LikeCommentShareVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.seenBy34LikeCommentShare), timeoutMs, soft);
  }

  async clickMoreCommentsLikeCommentShare(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.moreCommentsLikeCommentShare));
  }

  async doubleClickMoreCommentsLikeCommentShare(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.moreCommentsLikeCommentShare));
  }

  async expectMoreCommentsLikeCommentShareVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.moreCommentsLikeCommentShare), timeoutMs, soft);
  }

  async getInnerTextNancyBauma4Years(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.nancyBauma4Years));
  }

  async expectNancyBauma4YearsVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.nancyBauma4Years), timeoutMs, soft);
  }

  async getInnerTextStephenCahillHeyCool(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.stephenCahillHeyCool));
  }

  async expectStephenCahillHeyCoolVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.stephenCahillHeyCool), timeoutMs, soft);
  }

  async clickStephenCahill(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.stephenCahill));
  }

  async expectStephenCahillVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.stephenCahill), timeoutMs, soft);
  }

  async getInnerTextHeyCoolThanks(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.heyCoolThanks));
  }

  async expectHeyCoolThanksVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.heyCoolThanks), timeoutMs, soft);
  }

  async getInnerTextLawrenceScofieldLikeComment(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.lawrenceScofieldLikeComment));
  }

  async expectLawrenceScofieldLikeCommentVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.lawrenceScofieldLikeComment), timeoutMs, soft);
  }

  async clickLawrenceScofieldLikeComment2(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.lawrenceScofieldLikeComment2));
  }

  async expectLawrenceScofieldLikeComment2Visible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.lawrenceScofieldLikeComment2), timeoutMs, soft);
  }

  async getInnerTextExceptionalCustomerExperienceCx3(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCx3));
  }

  async expectExceptionalCustomerExperienceCx3Visible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCx3), timeoutMs, soft);
  }

  async getInnerTextIsThereAWayLikeComment(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.isThereAWayLikeComment));
  }

  async expectIsThereAWayLikeCommentVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.isThereAWayLikeComment), timeoutMs, soft);
  }

  async getInnerTextIsThereAWay(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.isThereAWay));
  }

  async expectIsThereAWayVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.isThereAWay), timeoutMs, soft);
  }

  async clickHttpsKronosLightningForceComLightningR0036100001MjGXmAANView(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.httpsKronosLightningForceComLightningR0036100001MjGXmAANView));
  }

  async expectHttpsKronosLightningForceComLightningR0036100001MjGXmAANViewVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.httpsKronosLightningForceComLightningR0036100001MjGXmAANView), timeoutMs, soft);
  }

  async getInnerTextSftpAccountRequest(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.sftpAccountRequest));
  }

  async expectSftpAccountRequestVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.sftpAccountRequest), timeoutMs, soft);
  }

  async getInnerTextThankYouLikeComment(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.thankYouLikeComment));
  }

  async expectThankYouLikeCommentVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.thankYouLikeComment), timeoutMs, soft);
  }

  async getInnerTextLarry(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.larry));
  }

  async expectLarryVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.larry), timeoutMs, soft);
  }

  async clickSeenBy32LikeComment(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.seenBy32LikeComment));
  }

  async expectSeenBy32LikeCommentVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.seenBy32LikeComment), timeoutMs, soft);
  }

  async clickSusanCharestLikeComment(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.susanCharestLikeComment));
  }

  async expectSusanCharestLikeCommentVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.susanCharestLikeComment), timeoutMs, soft);
  }

  async getInnerTextExceptionalCustomerExperienceCx4(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCx4));
  }

  async expectExceptionalCustomerExperienceCx4Visible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCx4), timeoutMs, soft);
  }

  async clickJulianaVanAmsterdamLikeCommentShare(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.julianaVanAmsterdamLikeCommentShare));
  }

  async expectJulianaVanAmsterdamLikeCommentShareVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.julianaVanAmsterdamLikeCommentShare), timeoutMs, soft);
  }

  async getInnerTextExperienceOperationsInternalNewsletter(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.experienceOperationsInternalNewsletter));
  }

  async expectExperienceOperationsInternalNewsletterVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.experienceOperationsInternalNewsletter), timeoutMs, soft);
  }

  async getInnerTextTheExperienceOperationsTeam(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.theExperienceOperationsTeam));
  }

  async expectTheExperienceOperationsTeamVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.theExperienceOperationsTeam), timeoutMs, soft);
  }

  async clickJennReaLikeCommentShare(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.jennReaLikeCommentShare));
  }

  async expectJennReaLikeCommentShareVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.jennReaLikeCommentShare), timeoutMs, soft);
  }

  async getInnerTextAsOurFirst(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.asOurFirst));
  }

  async expectAsOurFirstVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.asOurFirst), timeoutMs, soft);
  }

  async getInnerTextLinkToOurNewsletterLikeCommentShare(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.linkToOurNewsletterLikeCommentShare));
  }

  async expectLinkToOurNewsletterLikeCommentShareVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.linkToOurNewsletterLikeCommentShare), timeoutMs, soft);
  }

  async getInnerTextWeRecommendOpeningIn(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.weRecommendOpeningIn));
  }

  async expectWeRecommendOpeningInVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.weRecommendOpeningIn), timeoutMs, soft);
  }

  async clickLynetteKenneyLikeCommentShare(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.lynetteKenneyLikeCommentShare));
  }

  async expectLynetteKenneyLikeCommentShareVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.lynetteKenneyLikeCommentShare), timeoutMs, soft);
  }

  async clickDevinShane(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.devinShane));
  }

  async expectDevinShaneVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.devinShane), timeoutMs, soft);
  }

  async clickNancyBurdzelLikeCommentShare(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.nancyBurdzelLikeCommentShare));
  }

  async expectNancyBurdzelLikeCommentShareVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.nancyBurdzelLikeCommentShare), timeoutMs, soft);
  }

  async clickSusanPaugh(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.susanPaugh));
  }

  async expectSusanPaughVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.susanPaugh), timeoutMs, soft);
  }

  async clickAliLyderNortonLikeCommentShare(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.aliLyderNortonLikeCommentShare));
  }

  async expectAliLyderNortonLikeCommentShareVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.aliLyderNortonLikeCommentShare), timeoutMs, soft);
  }

  async clickBradleyChandler(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.bradleyChandler));
  }

  async expectBradleyChandlerVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.bradleyChandler), timeoutMs, soft);
  }

  async clickDavidDownie(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.davidDownie));
  }

  async expectDavidDownieVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.davidDownie), timeoutMs, soft);
  }

  async clickAllThingsMarketing(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.allThingsMarketing));
  }

  async expectAllThingsMarketingVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.allThingsMarketing), timeoutMs, soft);
  }

  async clickAllThingsCloud(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.allThingsCloud));
  }

  async expectAllThingsCloudVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.allThingsCloud), timeoutMs, soft);
  }

  async clickAllThingsIt(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.allThingsIt));
  }

  async expectAllThingsItVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.allThingsIt), timeoutMs, soft);
  }

  async clickKronosSharepointComLikeCommentShare(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.kronosSharepointComLikeCommentShare));
  }

  async expectKronosSharepointComLikeCommentShareVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.kronosSharepointComLikeCommentShare), timeoutMs, soft);
  }

  async clickHttpsKronosSharepointComWTCxOpsEXpPNVlYSFZMprYVzLDS2z4BGUWUirY57ve3Q6wJJo9wES8lnBgLikeCommentShare(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.httpsKronosSharepointComWTCxOpsEXpPNVlYSFZMprYVzLDS2z4BGUWUirY57ve3Q6wJJo9wES8lnBgLikeCommentShare));
  }

  async expectHttpsKronosSharepointComWTCxOpsEXpPNVlYSFZMprYVzLDS2z4BGUWUirY57ve3Q6wJJo9wES8lnBgLikeCommentShareVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.httpsKronosSharepointComWTCxOpsEXpPNVlYSFZMprYVzLDS2z4BGUWUirY57ve3Q6wJJo9wES8lnBgLikeCommentShare), timeoutMs, soft);
  }

  async clickCommentsLikeCommentShare2(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.commentsLikeCommentShare2));
  }

  async expectCommentsLikeCommentShare2Visible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.commentsLikeCommentShare2), timeoutMs, soft);
  }

  async clickSeenBy30LikeCommentShare(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.seenBy30LikeCommentShare));
  }

  async expectSeenBy30LikeCommentShareVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.seenBy30LikeCommentShare), timeoutMs, soft);
  }

  async clickErinFord(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.erinFord));
  }

  async expectErinFordVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.erinFord), timeoutMs, soft);
  }

  async clickAndreaChadis(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.andreaChadis));
  }

  async expectAndreaChadisVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.andreaChadis), timeoutMs, soft);
  }

  async clickOthersLikeCommentShare3(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.othersLikeCommentShare3));
  }

  async expectOthersLikeCommentShare3Visible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.othersLikeCommentShare3), timeoutMs, soft);
  }

  async getInnerTextPhyllisMerchant6Years(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.phyllisMerchant6Years));
  }

  async expectPhyllisMerchant6YearsVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.phyllisMerchant6Years), timeoutMs, soft);
  }

  async clickPhyllisMerchantLikeCommentShare(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.phyllisMerchantLikeCommentShare));
  }

  async expectPhyllisMerchantLikeCommentShareVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.phyllisMerchantLikeCommentShare), timeoutMs, soft);
  }

  async getInnerTextNancyBurdzelLooksGood(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.nancyBurdzelLooksGood));
  }

  async expectNancyBurdzelLooksGoodVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.nancyBurdzelLooksGood), timeoutMs, soft);
  }

  async getInnerTextHiThere(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.hiThere));
  }

  async expectHiThereVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.hiThere), timeoutMs, soft);
  }

  async getInnerTextItSBeenAFew(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.itSBeenAFew));
  }

  async expectItSBeenAFewVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.itSBeenAFew), timeoutMs, soft);
  }

  async getInnerTextForFolksWhoWere(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.forFolksWhoWere));
  }

  async expectForFolksWhoWereVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.forFolksWhoWere), timeoutMs, soft);
  }

  async getInnerTextMigrationsSharePointSite(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.migrationsSharePointSite));
  }

  async expectMigrationsSharePointSiteVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.migrationsSharePointSite), timeoutMs, soft);
  }

  async getInnerTextMigrationsSharePoint(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.migrationsSharePoint));
  }

  async expectMigrationsSharePointVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.migrationsSharePoint), timeoutMs, soft);
  }

  async clickHttpsKronosSharepointComTeamsIndustrymarketingMigrations(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.httpsKronosSharepointComTeamsIndustrymarketingMigrations));
  }

  async expectHttpsKronosSharepointComTeamsIndustrymarketingMigrationsVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.httpsKronosSharepointComTeamsIndustrymarketingMigrations), timeoutMs, soft);
  }

  async getInnerTextMigrationInsightsSalesforceFaq(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.migrationInsightsSalesforceFaq));
  }

  async expectMigrationInsightsSalesforceFaqVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.migrationInsightsSalesforceFaq), timeoutMs, soft);
  }

  async getInnerTextMigrationInsightsSalesforceLikeCommentShare(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.migrationInsightsSalesforceLikeCommentShare));
  }

  async expectMigrationInsightsSalesforceLikeCommentShareVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.migrationInsightsSalesforceLikeCommentShare), timeoutMs, soft);
  }

  async clickHttpsKronosSharepointComWRTeamsCxOpsLayouts15DocAspxSourcedoc7BDC0510DD06E04A86BD11F2731DFEAAF07DFileMigration20Insights20Salesforce20FAQDocxActionDefaultMobileredirectTrue20Web1Cid9c9e5ebeD5974e47B1a556b4cd142ef8(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.httpsKronosSharepointComWRTeamsCxOpsLayouts15DocAspxSourcedoc7BDC0510DD06E04A86BD11F2731DFEAAF07DFileMigration20Insights20Salesforce20FAQDocxActionDefaultMobileredirectTrue20Web1Cid9c9e5ebeD5974e47B1a556b4cd142ef8));
  }

  async expectHttpsKronosSharepointComWRTeamsCxOpsLayouts15DocAspxSourcedoc7BDC0510DD06E04A86BD11F2731DFEAAF07DFileMigration20Insights20Salesforce20FAQDocxActionDefaultMobileredirectTrue20Web1Cid9c9e5ebeD5974e47B1a556b4cd142ef8Visible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.httpsKronosSharepointComWRTeamsCxOpsLayouts15DocAspxSourcedoc7BDC0510DD06E04A86BD11F2731DFEAAF07DFileMigration20Insights20Salesforce20FAQDocxActionDefaultMobileredirectTrue20Web1Cid9c9e5ebeD5974e47B1a556b4cd142ef8), timeoutMs, soft);
  }

  async getInnerTextMigrationInsightsSalesforceOnePager(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.migrationInsightsSalesforceOnePager));
  }

  async expectMigrationInsightsSalesforceOnePagerVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.migrationInsightsSalesforceOnePager), timeoutMs, soft);
  }

  async clickHttpsKronosSharepointComPRTeamsCxOpsLayouts15DocAspxSourcedoc7BAD69AC5798EE43ADB3C27895148D096A7DFileMigration20Insights20Salesforce20OnePager201PptxActionEditMobileredirectTrueWeb1CidCfa355b5C3f14cbaAf09C6a2872a02a5(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.httpsKronosSharepointComPRTeamsCxOpsLayouts15DocAspxSourcedoc7BAD69AC5798EE43ADB3C27895148D096A7DFileMigration20Insights20Salesforce20OnePager201PptxActionEditMobileredirectTrueWeb1CidCfa355b5C3f14cbaAf09C6a2872a02a5));
  }

  async expectHttpsKronosSharepointComPRTeamsCxOpsLayouts15DocAspxSourcedoc7BAD69AC5798EE43ADB3C27895148D096A7DFileMigration20Insights20Salesforce20OnePager201PptxActionEditMobileredirectTrueWeb1CidCfa355b5C3f14cbaAf09C6a2872a02a5Visible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.httpsKronosSharepointComPRTeamsCxOpsLayouts15DocAspxSourcedoc7BAD69AC5798EE43ADB3C27895148D096A7DFileMigration20Insights20Salesforce20OnePager201PptxActionEditMobileredirectTrueWeb1CidCfa355b5C3f14cbaAf09C6a2872a02a5), timeoutMs, soft);
  }

  async getInnerTextMigrationInsightsSalesforceTraining(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.migrationInsightsSalesforceTraining));
  }

  async expectMigrationInsightsSalesforceTrainingVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.migrationInsightsSalesforceTraining), timeoutMs, soft);
  }

  async clickHttpsWebMicrosoftstreamComVideoC80f4f72F6834aa1977811a8d234f11cReferrerHttps2F2FkronosSharepointCom2F(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.httpsWebMicrosoftstreamComVideoC80f4f72F6834aa1977811a8d234f11cReferrerHttps2F2FkronosSharepointCom2F));
  }

  async expectHttpsWebMicrosoftstreamComVideoC80f4f72F6834aa1977811a8d234f11cReferrerHttps2F2FkronosSharepointCom2FVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.httpsWebMicrosoftstreamComVideoC80f4f72F6834aa1977811a8d234f11cReferrerHttps2F2FkronosSharepointCom2F), timeoutMs, soft);
  }

  async getInnerTextReadyMadeMigrationInsightsSalesforce(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.readyMadeMigrationInsightsSalesforce));
  }

  async expectReadyMadeMigrationInsightsSalesforceVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.readyMadeMigrationInsightsSalesforce), timeoutMs, soft);
  }

  async getInnerTextReadyMadeMigrationInsights(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.readyMadeMigrationInsights));
  }

  async expectReadyMadeMigrationInsightsVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.readyMadeMigrationInsights), timeoutMs, soft);
  }

  async clickHttpsKronosLightningForceComLightningRReport00O4M0000045NuOUAUView(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.httpsKronosLightningForceComLightningRReport00O4M0000045NuOUAUView));
  }

  async expectHttpsKronosLightningForceComLightningRReport00O4M0000045NuOUAUViewVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.httpsKronosLightningForceComLightningRReport00O4M0000045NuOUAUView), timeoutMs, soft);
  }

  async getInnerTextWeReHereToHelpLikeCommentShare(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.weReHereToHelpLikeCommentShare));
  }

  async expectWeReHereToHelpLikeCommentShareVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.weReHereToHelpLikeCommentShare), timeoutMs, soft);
  }

  async clickMigrationsUkgCom(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.migrationsUkgCom));
  }

  async expectMigrationsUkgComVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.migrationsUkgCom), timeoutMs, soft);
  }

  async getInnerTextWithYourQuestionsOr(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.withYourQuestionsOr));
  }

  async expectWithYourQuestionsOrVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.withYourQuestionsOr), timeoutMs, soft);
  }

  async getInnerTextWeLovedHearingFrom(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.weLovedHearingFrom));
  }

  async expectWeLovedHearingFromVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.weLovedHearingFrom), timeoutMs, soft);
  }

  async getInnerTextJohnKellyMattDowling(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.johnKellyMattDowling));
  }

  async expectJohnKellyMattDowlingVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.johnKellyMattDowling), timeoutMs, soft);
  }

  async clickJohnKelly(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.johnKelly));
  }

  async expectJohnKellyVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.johnKelly), timeoutMs, soft);
  }

  async clickMattDowling(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.mattDowling));
  }

  async expectMattDowlingVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.mattDowling), timeoutMs, soft);
  }

  async clickLisaPratt(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.lisaPratt));
  }

  async expectLisaPrattVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.lisaPratt), timeoutMs, soft);
  }

  async clickCommentsLikeCommentShare3(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.commentsLikeCommentShare3));
  }

  async expectCommentsLikeCommentShare3Visible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.commentsLikeCommentShare3), timeoutMs, soft);
  }

  async clickSeenBy24LikeCommentShare(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.seenBy24LikeCommentShare));
  }

  async expectSeenBy24LikeCommentShareVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.seenBy24LikeCommentShare), timeoutMs, soft);
  }

  async clickRachelGonzales(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.rachelGonzales));
  }

  async expectRachelGonzalesVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.rachelGonzales), timeoutMs, soft);
  }

  async clickOthersLikeCommentShare4(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.othersLikeCommentShare4));
  }

  async expectOthersLikeCommentShare4Visible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.othersLikeCommentShare4), timeoutMs, soft);
  }

  async getInnerTextNancyBurdzel6Years(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.nancyBurdzel6Years));
  }

  async expectNancyBurdzel6YearsVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.nancyBurdzel6Years), timeoutMs, soft);
  }

  async clickNancyBurdzelLikeCommentShare3(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.nancyBurdzelLikeCommentShare3));
  }

  async expectNancyBurdzelLikeCommentShare3Visible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.nancyBurdzelLikeCommentShare3), timeoutMs, soft);
  }

  async getInnerTextBradVanAntwerpHere(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.bradVanAntwerpHere));
  }

  async expectBradVanAntwerpHereVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.bradVanAntwerpHere), timeoutMs, soft);
  }

  async clickBradVanAntwerp(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.bradVanAntwerp));
  }

  async expectBradVanAntwerpVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.bradVanAntwerp), timeoutMs, soft);
  }

  async getInnerTextHereAreSome(): Promise<string> {
    return getTextWhenVisible(webLocator(this.page, HomePage.L.hereAreSome));
  }

  async expectHereAreSomeVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.hereAreSome), timeoutMs, soft);
  }

  async clickViewMorePosts(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.viewMorePosts));
  }

  async doubleClickViewMorePosts(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.viewMorePosts));
  }

  async expectViewMorePostsVisible(timeoutMs = 30_000, soft = true): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.viewMorePosts), timeoutMs, soft);
  }

  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  /** Assert page title matches an expected string or regex. */
  async expectPageTitle(expected: string | RegExp, timeoutMs = 30_000): Promise<void> {
    await expectPageTitle(this.page, expected, timeoutMs);
  }

  /** Verify we are on the correct page using the title captured at record time. */
  async verifyOnPage(timeoutMs = 30_000): Promise<void> {
    await expectPageTitle(this.page, 'Home | Salesforce', timeoutMs);
  }

  // ── #brandBand_2 table ──────────────────────────────────────────────

  /** Text of any cell. row is 0-based; col is column name or 0-based index. */
  async getSldsTable1TableText(row: number, col: number | string): Promise<string> {
    return this.sldsTable1.getText(row, col);
  }

  /** All text values for a column across every row. */
  async getSldsTable1TableColumn(col: number | string): Promise<string[]> {
    return this.sldsTable1.getColumn(col);
  }

  /** All cell values for a row as { "Column Name": "value" }. */
  async getSldsTable1TableRowData(row: number): Promise<Record<string, string>> {
    return this.sldsTable1.getRowData(row);
  }

  /** First row where col equals value (exact). Pass exact=false for contains match. */
  async findSldsTable1TableRow(col: number | string, value: string, exact = true): Promise<number> {
    return this.sldsTable1.findRow(col, value, exact);
  }

  /** First row where any cell contains text (case-insensitive). */
  async findSldsTable1TableRowByText(text: string): Promise<number> {
    return this.sldsTable1.findRowByText(text);
  }

  /** Total number of body rows. */
  async getSldsTable1TableRowCount(): Promise<number> {
    return this.sldsTable1.rowCount();
  }

  /** Click the <a> link inside a cell. */
  async clickSldsTable1TableLink(row: number, col: number | string): Promise<void> {
    return this.sldsTable1.clickLink(row, col);
  }

  /** href of the link inside a cell, or null if there is no link. */
  async getSldsTable1TableLinkHref(row: number, col: number | string): Promise<string | null> {
    const cell = await this.sldsTable1.cell(row, col);
    const link = cell.locator('a');
    return (await link.count()) > 0 ? link.getAttribute('href') : null;
  }

  /** Check the row selection checkbox (idempotent). */
  async checkSldsTable1TableRow(row: number): Promise<void> {
    const cb = this.sldsTable1.row(row).locator('input[type="checkbox"]').first();
    if (await cb.isChecked()) return;
    await cb.check({ force: true });
  }

  /** Uncheck the row selection checkbox (idempotent). */
  async uncheckSldsTable1TableRow(row: number): Promise<void> {
    const cb = this.sldsTable1.row(row).locator('input[type="checkbox"]').first();
    if (!(await cb.isChecked())) return;
    await cb.uncheck({ force: true });
  }

  /** Whether the row selection checkbox is currently checked. */
  async isSldsTable1TableRowChecked(row: number): Promise<boolean> {
    return this.sldsTable1.row(row).locator('input[type="checkbox"]').first().isChecked();
  }

  /** Current state of the toggle switch (role="switch") in the row — true = on/active. */
  async getSldsTable1TableSwitchState(row: number): Promise<boolean> {
    return this.sldsTable1.getSwitchState(row);
  }

  /** Toggle the switch in a row. Pass targetState=true/false to set explicitly. */
  async toggleSldsTable1TableSwitch(row: number, targetState?: boolean): Promise<void> {
    return this.sldsTable1.toggleSwitch(row, targetState);
  }

  /** Click a button in a row by optional label; omit label to click the last button (action menu). */
  async clickSldsTable1TableButton(row: number, label?: string): Promise<void> {
    return this.sldsTable1.clickButton(row, label);
  }

  /** Click a named option inside an already-open row action dropdown. */
  async clickSldsTable1TableMenuOption(label: string): Promise<void> {
    return this.sldsTable1.clickMenuOption(label);
  }

  /** Click a column header to sort. Call twice to reverse direction. */
  async sortSldsTable1TableBy(col: string): Promise<void> {
    return this.sldsTable1.sortBy(col);
  }

  /** Locator for any element inside a row — toggles, buttons, custom controls. */
  getSldsTable1TableInRow(row: number, selector: string): Locator {
    return this.sldsTable1.getInRow(row, selector);
  }


  async doubleClickOpenMenuItemSubmenu(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.openMenuItemSubmenu));
  }

  async longPressOpenMenuItemSubmenu(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.openMenuItemSubmenu));
  }

  async expectOpenMenuItemSubmenuHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.openMenuItemSubmenu), timeoutMs);
  }

  async expectOpenMenuItemSubmenuText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.openMenuItemSubmenu), expected, timeoutMs);
  }

  async expectOpenMenuItemSubmenuContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.openMenuItemSubmenu), substring, timeoutMs);
  }

  async expectOpenMenuItemSubmenuValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.openMenuItemSubmenu), value, timeoutMs);
  }

  async expectOpenMenuItemSubmenuEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.openMenuItemSubmenu), timeoutMs);
  }

  async expectOpenMenuItemSubmenuDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.openMenuItemSubmenu), timeoutMs);
  }

  async expectOpenMenuItemSubmenuChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.openMenuItemSubmenu), timeoutMs);
  }

  async expectOpenMenuItemSubmenuUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.openMenuItemSubmenu), timeoutMs);
  }

  async expectOpenMenuItemSubmenuFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.openMenuItemSubmenu), timeoutMs);
  }

  async expectOpenMenuItemSubmenuCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.openMenuItemSubmenu), count, timeoutMs);
  }

  async scrollOpenMenuItemSubmenuIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.openMenuItemSubmenu));
  }

  async doubleClickOption(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.option));
  }

  async longPressOption(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.option));
  }

  async expectOptionHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.option), timeoutMs);
  }

  async expectOptionText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.option), expected, timeoutMs);
  }

  async expectOptionContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.option), substring, timeoutMs);
  }

  async expectOptionValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.option), value, timeoutMs);
  }

  async expectOptionEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.option), timeoutMs);
  }

  async expectOptionDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.option), timeoutMs);
  }

  async expectOptionChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.option), timeoutMs);
  }

  async expectOptionUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.option), timeoutMs);
  }

  async expectOptionFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.option), timeoutMs);
  }

  async expectOptionCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.option), count, timeoutMs);
  }

  async scrollOptionIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.option));
  }

  async doubleClickSkipToNavigation(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.skipToNavigation));
  }

  async longPressSkipToNavigation(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.skipToNavigation));
  }

  async expectSkipToNavigationHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.skipToNavigation), timeoutMs);
  }

  async expectSkipToNavigationText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.skipToNavigation), expected, timeoutMs);
  }

  async expectSkipToNavigationContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.skipToNavigation), substring, timeoutMs);
  }

  async expectSkipToNavigationValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.skipToNavigation), value, timeoutMs);
  }

  async expectSkipToNavigationEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.skipToNavigation), timeoutMs);
  }

  async expectSkipToNavigationDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.skipToNavigation), timeoutMs);
  }

  async expectSkipToNavigationChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.skipToNavigation), timeoutMs);
  }

  async expectSkipToNavigationUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.skipToNavigation), timeoutMs);
  }

  async expectSkipToNavigationFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.skipToNavigation), timeoutMs);
  }

  async expectSkipToNavigationCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.skipToNavigation), count, timeoutMs);
  }

  async scrollSkipToNavigationIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.skipToNavigation));
  }

  async doubleClickSkipToMainContent(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.skipToMainContent));
  }

  async longPressSkipToMainContent(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.skipToMainContent));
  }

  async expectSkipToMainContentHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.skipToMainContent), timeoutMs);
  }

  async expectSkipToMainContentText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.skipToMainContent), expected, timeoutMs);
  }

  async expectSkipToMainContentContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.skipToMainContent), substring, timeoutMs);
  }

  async expectSkipToMainContentValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.skipToMainContent), value, timeoutMs);
  }

  async expectSkipToMainContentEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.skipToMainContent), timeoutMs);
  }

  async expectSkipToMainContentDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.skipToMainContent), timeoutMs);
  }

  async expectSkipToMainContentChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.skipToMainContent), timeoutMs);
  }

  async expectSkipToMainContentUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.skipToMainContent), timeoutMs);
  }

  async expectSkipToMainContentFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.skipToMainContent), timeoutMs);
  }

  async expectSkipToMainContentCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.skipToMainContent), count, timeoutMs);
  }

  async scrollSkipToMainContentIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.skipToMainContent));
  }

  async longPressTogglePanel(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.togglePanel));
  }

  async expectTogglePanelHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.togglePanel), timeoutMs);
  }

  async expectTogglePanelText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.togglePanel), expected, timeoutMs);
  }

  async expectTogglePanelContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.togglePanel), substring, timeoutMs);
  }

  async expectTogglePanelValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.togglePanel), value, timeoutMs);
  }

  async expectTogglePanelEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.togglePanel), timeoutMs);
  }

  async expectTogglePanelDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.togglePanel), timeoutMs);
  }

  async expectTogglePanelChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.togglePanel), timeoutMs);
  }

  async expectTogglePanelUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.togglePanel), timeoutMs);
  }

  async expectTogglePanelFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.togglePanel), timeoutMs);
  }

  async expectTogglePanelCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.togglePanel), count, timeoutMs);
  }

  async scrollTogglePanelIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.togglePanel));
  }

  async clickSandboxSdev(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.sandboxSdev));
  }

  async doubleClickSandboxSdev(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.sandboxSdev));
  }

  async longPressSandboxSdev(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.sandboxSdev));
  }

  async expectSandboxSdevHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.sandboxSdev), timeoutMs);
  }

  async expectSandboxSdevText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.sandboxSdev), expected, timeoutMs);
  }

  async expectSandboxSdevContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.sandboxSdev), substring, timeoutMs);
  }

  async expectSandboxSdevValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.sandboxSdev), value, timeoutMs);
  }

  async expectSandboxSdevEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.sandboxSdev), timeoutMs);
  }

  async expectSandboxSdevDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.sandboxSdev), timeoutMs);
  }

  async expectSandboxSdevChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.sandboxSdev), timeoutMs);
  }

  async expectSandboxSdevUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.sandboxSdev), timeoutMs);
  }

  async expectSandboxSdevFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.sandboxSdev), timeoutMs);
  }

  async expectSandboxSdevCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.sandboxSdev), count, timeoutMs);
  }

  async scrollSandboxSdevIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.sandboxSdev));
  }

  async longPressShowMenu(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.showMenu));
  }

  async expectShowMenuHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.showMenu), timeoutMs);
  }

  async expectShowMenuText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.showMenu), expected, timeoutMs);
  }

  async expectShowMenuContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.showMenu), substring, timeoutMs);
  }

  async expectShowMenuValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.showMenu), value, timeoutMs);
  }

  async expectShowMenuEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.showMenu), timeoutMs);
  }

  async expectShowMenuDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.showMenu), timeoutMs);
  }

  async expectShowMenuChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.showMenu), timeoutMs);
  }

  async expectShowMenuUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.showMenu), timeoutMs);
  }

  async expectShowMenuFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.showMenu), timeoutMs);
  }

  async expectShowMenuCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.showMenu), count, timeoutMs);
  }

  async scrollShowMenuIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.showMenu));
  }

  async longPressSearch(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.search));
  }

  async expectSearchHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.search), timeoutMs);
  }

  async expectSearchText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.search), expected, timeoutMs);
  }

  async expectSearchContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.search), substring, timeoutMs);
  }

  async expectSearchValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.search), value, timeoutMs);
  }

  async expectSearchEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.search), timeoutMs);
  }

  async expectSearchDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.search), timeoutMs);
  }

  async expectSearchChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.search), timeoutMs);
  }

  async expectSearchUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.search), timeoutMs);
  }

  async expectSearchFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.search), timeoutMs);
  }

  async expectSearchCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.search), count, timeoutMs);
  }

  async scrollSearchIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.search));
  }

  async doubleClickAgentforce(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.agentforce));
  }

  async longPressAgentforce(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.agentforce));
  }

  async expectAgentforceHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.agentforce), timeoutMs);
  }

  async expectAgentforceText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.agentforce), expected, timeoutMs);
  }

  async expectAgentforceContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.agentforce), substring, timeoutMs);
  }

  async expectAgentforceValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.agentforce), value, timeoutMs);
  }

  async expectAgentforceEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.agentforce), timeoutMs);
  }

  async expectAgentforceDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.agentforce), timeoutMs);
  }

  async expectAgentforceChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.agentforce), timeoutMs);
  }

  async expectAgentforceUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.agentforce), timeoutMs);
  }

  async expectAgentforceFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.agentforce), timeoutMs);
  }

  async expectAgentforceCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.agentforce), count, timeoutMs);
  }

  async scrollAgentforceIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.agentforce));
  }

  async doubleClickThisItemDoesnTSupport(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.thisItemDoesnTSupport));
  }

  async longPressThisItemDoesnTSupport(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.thisItemDoesnTSupport));
  }

  async expectThisItemDoesnTSupportHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.thisItemDoesnTSupport), timeoutMs);
  }

  async expectThisItemDoesnTSupportText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.thisItemDoesnTSupport), expected, timeoutMs);
  }

  async expectThisItemDoesnTSupportContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.thisItemDoesnTSupport), substring, timeoutMs);
  }

  async expectThisItemDoesnTSupportValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.thisItemDoesnTSupport), value, timeoutMs);
  }

  async expectThisItemDoesnTSupportEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.thisItemDoesnTSupport), timeoutMs);
  }

  async expectThisItemDoesnTSupportDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.thisItemDoesnTSupport), timeoutMs);
  }

  async expectThisItemDoesnTSupportChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.thisItemDoesnTSupport), timeoutMs);
  }

  async expectThisItemDoesnTSupportUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.thisItemDoesnTSupport), timeoutMs);
  }

  async expectThisItemDoesnTSupportFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.thisItemDoesnTSupport), timeoutMs);
  }

  async expectThisItemDoesnTSupportCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.thisItemDoesnTSupport), count, timeoutMs);
  }

  async scrollThisItemDoesnTSupportIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.thisItemDoesnTSupport));
  }

  async longPressThisItemDoesnTSupportButton(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.thisItemDoesnTSupportButton));
  }

  async expectThisItemDoesnTSupportButtonHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.thisItemDoesnTSupportButton), timeoutMs);
  }

  async expectThisItemDoesnTSupportButtonText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.thisItemDoesnTSupportButton), expected, timeoutMs);
  }

  async expectThisItemDoesnTSupportButtonContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.thisItemDoesnTSupportButton), substring, timeoutMs);
  }

  async expectThisItemDoesnTSupportButtonValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.thisItemDoesnTSupportButton), value, timeoutMs);
  }

  async expectThisItemDoesnTSupportButtonEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.thisItemDoesnTSupportButton), timeoutMs);
  }

  async expectThisItemDoesnTSupportButtonDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.thisItemDoesnTSupportButton), timeoutMs);
  }

  async expectThisItemDoesnTSupportButtonChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.thisItemDoesnTSupportButton), timeoutMs);
  }

  async expectThisItemDoesnTSupportButtonUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.thisItemDoesnTSupportButton), timeoutMs);
  }

  async expectThisItemDoesnTSupportButtonFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.thisItemDoesnTSupportButton), timeoutMs);
  }

  async expectThisItemDoesnTSupportButtonCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.thisItemDoesnTSupportButton), count, timeoutMs);
  }

  async scrollThisItemDoesnTSupportButtonIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.thisItemDoesnTSupportButton));
  }

  async longPressFavoritesList(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.favoritesList));
  }

  async expectFavoritesListHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.favoritesList), timeoutMs);
  }

  async expectFavoritesListText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.favoritesList), expected, timeoutMs);
  }

  async expectFavoritesListContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.favoritesList), substring, timeoutMs);
  }

  async expectFavoritesListValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.favoritesList), value, timeoutMs);
  }

  async expectFavoritesListEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.favoritesList), timeoutMs);
  }

  async expectFavoritesListDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.favoritesList), timeoutMs);
  }

  async expectFavoritesListChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.favoritesList), timeoutMs);
  }

  async expectFavoritesListUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.favoritesList), timeoutMs);
  }

  async expectFavoritesListFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.favoritesList), timeoutMs);
  }

  async expectFavoritesListCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.favoritesList), count, timeoutMs);
  }

  async scrollFavoritesListIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.favoritesList));
  }

  async doubleClickGlobalActions(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.globalActions));
  }

  async longPressGlobalActions(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.globalActions));
  }

  async expectGlobalActionsHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.globalActions), timeoutMs);
  }

  async expectGlobalActionsText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.globalActions), expected, timeoutMs);
  }

  async expectGlobalActionsContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.globalActions), substring, timeoutMs);
  }

  async expectGlobalActionsValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.globalActions), value, timeoutMs);
  }

  async expectGlobalActionsEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.globalActions), timeoutMs);
  }

  async expectGlobalActionsDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.globalActions), timeoutMs);
  }

  async expectGlobalActionsChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.globalActions), timeoutMs);
  }

  async expectGlobalActionsUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.globalActions), timeoutMs);
  }

  async expectGlobalActionsFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.globalActions), timeoutMs);
  }

  async expectGlobalActionsCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.globalActions), count, timeoutMs);
  }

  async scrollGlobalActionsIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.globalActions));
  }

  async doubleClickGuidanceCenter(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.guidanceCenter));
  }

  async longPressGuidanceCenter(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.guidanceCenter));
  }

  async expectGuidanceCenterHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.guidanceCenter), timeoutMs);
  }

  async expectGuidanceCenterText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.guidanceCenter), expected, timeoutMs);
  }

  async expectGuidanceCenterContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.guidanceCenter), substring, timeoutMs);
  }

  async expectGuidanceCenterValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.guidanceCenter), value, timeoutMs);
  }

  async expectGuidanceCenterEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.guidanceCenter), timeoutMs);
  }

  async expectGuidanceCenterDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.guidanceCenter), timeoutMs);
  }

  async expectGuidanceCenterChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.guidanceCenter), timeoutMs);
  }

  async expectGuidanceCenterUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.guidanceCenter), timeoutMs);
  }

  async expectGuidanceCenterFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.guidanceCenter), timeoutMs);
  }

  async expectGuidanceCenterCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.guidanceCenter), count, timeoutMs);
  }

  async scrollGuidanceCenterIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.guidanceCenter));
  }

  async doubleClickSalesforceHelp(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.salesforceHelp));
  }

  async longPressSalesforceHelp(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.salesforceHelp));
  }

  async expectSalesforceHelpHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.salesforceHelp), timeoutMs);
  }

  async expectSalesforceHelpText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.salesforceHelp), expected, timeoutMs);
  }

  async expectSalesforceHelpContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.salesforceHelp), substring, timeoutMs);
  }

  async expectSalesforceHelpValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.salesforceHelp), value, timeoutMs);
  }

  async expectSalesforceHelpEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.salesforceHelp), timeoutMs);
  }

  async expectSalesforceHelpDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.salesforceHelp), timeoutMs);
  }

  async expectSalesforceHelpChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.salesforceHelp), timeoutMs);
  }

  async expectSalesforceHelpUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.salesforceHelp), timeoutMs);
  }

  async expectSalesforceHelpFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.salesforceHelp), timeoutMs);
  }

  async expectSalesforceHelpCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.salesforceHelp), count, timeoutMs);
  }

  async scrollSalesforceHelpIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.salesforceHelp));
  }

  async doubleClickSetup(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.setup));
  }

  async longPressSetup(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.setup));
  }

  async expectSetupHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.setup), timeoutMs);
  }

  async expectSetupText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.setup), expected, timeoutMs);
  }

  async expectSetupContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.setup), substring, timeoutMs);
  }

  async expectSetupValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.setup), value, timeoutMs);
  }

  async expectSetupEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.setup), timeoutMs);
  }

  async expectSetupDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.setup), timeoutMs);
  }

  async expectSetupChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.setup), timeoutMs);
  }

  async expectSetupUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.setup), timeoutMs);
  }

  async expectSetupFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.setup), timeoutMs);
  }

  async expectSetupCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.setup), count, timeoutMs);
  }

  async scrollSetupIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.setup));
  }

  async doubleClickNotifications(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.notifications));
  }

  async longPressNotifications(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.notifications));
  }

  async expectNotificationsHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.notifications), timeoutMs);
  }

  async expectNotificationsText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.notifications), expected, timeoutMs);
  }

  async expectNotificationsContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.notifications), substring, timeoutMs);
  }

  async expectNotificationsValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.notifications), value, timeoutMs);
  }

  async expectNotificationsEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.notifications), timeoutMs);
  }

  async expectNotificationsDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.notifications), timeoutMs);
  }

  async expectNotificationsChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.notifications), timeoutMs);
  }

  async expectNotificationsUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.notifications), timeoutMs);
  }

  async expectNotificationsFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.notifications), timeoutMs);
  }

  async expectNotificationsCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.notifications), count, timeoutMs);
  }

  async scrollNotificationsIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.notifications));
  }

  async doubleClickViewProfile(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.viewProfile));
  }

  async longPressViewProfile(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.viewProfile));
  }

  async expectViewProfileHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.viewProfile), timeoutMs);
  }

  async expectViewProfileText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.viewProfile), expected, timeoutMs);
  }

  async expectViewProfileContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.viewProfile), substring, timeoutMs);
  }

  async expectViewProfileValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.viewProfile), value, timeoutMs);
  }

  async expectViewProfileEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.viewProfile), timeoutMs);
  }

  async expectViewProfileDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.viewProfile), timeoutMs);
  }

  async expectViewProfileChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.viewProfile), timeoutMs);
  }

  async expectViewProfileUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.viewProfile), timeoutMs);
  }

  async expectViewProfileFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.viewProfile), timeoutMs);
  }

  async expectViewProfileCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.viewProfile), count, timeoutMs);
  }

  async scrollViewProfileIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.viewProfile));
  }

  async longPressAppLauncher(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.appLauncher));
  }

  async expectAppLauncherHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.appLauncher), timeoutMs);
  }

  async expectAppLauncherText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.appLauncher), expected, timeoutMs);
  }

  async expectAppLauncherContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.appLauncher), substring, timeoutMs);
  }

  async expectAppLauncherValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.appLauncher), value, timeoutMs);
  }

  async expectAppLauncherEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.appLauncher), timeoutMs);
  }

  async expectAppLauncherDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.appLauncher), timeoutMs);
  }

  async expectAppLauncherChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.appLauncher), timeoutMs);
  }

  async expectAppLauncherUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.appLauncher), timeoutMs);
  }

  async expectAppLauncherFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.appLauncher), timeoutMs);
  }

  async expectAppLauncherCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.appLauncher), count, timeoutMs);
  }

  async scrollAppLauncherIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.appLauncher));
  }

  async clickSalesforceCpqLightning(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.salesforceCpqLightning));
  }

  async doubleClickSalesforceCpqLightning(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.salesforceCpqLightning));
  }

  async longPressSalesforceCpqLightning(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.salesforceCpqLightning));
  }

  async expectSalesforceCpqLightningHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.salesforceCpqLightning), timeoutMs);
  }

  async expectSalesforceCpqLightningText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.salesforceCpqLightning), expected, timeoutMs);
  }

  async expectSalesforceCpqLightningContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.salesforceCpqLightning), substring, timeoutMs);
  }

  async expectSalesforceCpqLightningValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.salesforceCpqLightning), value, timeoutMs);
  }

  async expectSalesforceCpqLightningEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.salesforceCpqLightning), timeoutMs);
  }

  async expectSalesforceCpqLightningDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.salesforceCpqLightning), timeoutMs);
  }

  async expectSalesforceCpqLightningChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.salesforceCpqLightning), timeoutMs);
  }

  async expectSalesforceCpqLightningUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.salesforceCpqLightning), timeoutMs);
  }

  async expectSalesforceCpqLightningFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.salesforceCpqLightning), timeoutMs);
  }

  async expectSalesforceCpqLightningCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.salesforceCpqLightning), count, timeoutMs);
  }

  async scrollSalesforceCpqLightningIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.salesforceCpqLightning));
  }

  async doubleClickHome(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.home));
  }

  async longPressHome(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.home));
  }

  async expectHomeHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.home), timeoutMs);
  }

  async expectHomeText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.home), expected, timeoutMs);
  }

  async expectHomeContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.home), substring, timeoutMs);
  }

  async expectHomeValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.home), value, timeoutMs);
  }

  async expectHomeEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.home), timeoutMs);
  }

  async expectHomeDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.home), timeoutMs);
  }

  async expectHomeChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.home), timeoutMs);
  }

  async expectHomeUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.home), timeoutMs);
  }

  async expectHomeFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.home), timeoutMs);
  }

  async expectHomeCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.home), count, timeoutMs);
  }

  async scrollHomeIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.home));
  }

  async doubleClickAccounts(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.accounts));
  }

  async longPressAccounts(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.accounts));
  }

  async expectAccountsHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.accounts), timeoutMs);
  }

  async expectAccountsText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.accounts), expected, timeoutMs);
  }

  async expectAccountsContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.accounts), substring, timeoutMs);
  }

  async expectAccountsValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.accounts), value, timeoutMs);
  }

  async expectAccountsEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.accounts), timeoutMs);
  }

  async expectAccountsDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.accounts), timeoutMs);
  }

  async expectAccountsChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.accounts), timeoutMs);
  }

  async expectAccountsUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.accounts), timeoutMs);
  }

  async expectAccountsFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.accounts), timeoutMs);
  }

  async expectAccountsCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.accounts), count, timeoutMs);
  }

  async scrollAccountsIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.accounts));
  }

  async doubleClickAccountsList(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.accountsList));
  }

  async longPressAccountsList(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.accountsList));
  }

  async expectAccountsListHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.accountsList), timeoutMs);
  }

  async expectAccountsListText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.accountsList), expected, timeoutMs);
  }

  async expectAccountsListContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.accountsList), substring, timeoutMs);
  }

  async expectAccountsListValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.accountsList), value, timeoutMs);
  }

  async expectAccountsListEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.accountsList), timeoutMs);
  }

  async expectAccountsListDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.accountsList), timeoutMs);
  }

  async expectAccountsListChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.accountsList), timeoutMs);
  }

  async expectAccountsListUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.accountsList), timeoutMs);
  }

  async expectAccountsListFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.accountsList), timeoutMs);
  }

  async expectAccountsListCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.accountsList), count, timeoutMs);
  }

  async scrollAccountsListIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.accountsList));
  }

  async doubleClickOpportunities(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.opportunities));
  }

  async longPressOpportunities(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.opportunities));
  }

  async expectOpportunitiesHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.opportunities), timeoutMs);
  }

  async expectOpportunitiesText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.opportunities), expected, timeoutMs);
  }

  async expectOpportunitiesContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.opportunities), substring, timeoutMs);
  }

  async expectOpportunitiesValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.opportunities), value, timeoutMs);
  }

  async expectOpportunitiesEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.opportunities), timeoutMs);
  }

  async expectOpportunitiesDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.opportunities), timeoutMs);
  }

  async expectOpportunitiesChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.opportunities), timeoutMs);
  }

  async expectOpportunitiesUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.opportunities), timeoutMs);
  }

  async expectOpportunitiesFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.opportunities), timeoutMs);
  }

  async expectOpportunitiesCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.opportunities), count, timeoutMs);
  }

  async scrollOpportunitiesIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.opportunities));
  }

  async doubleClickOpportunitiesList(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.opportunitiesList));
  }

  async longPressOpportunitiesList(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.opportunitiesList));
  }

  async expectOpportunitiesListHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.opportunitiesList), timeoutMs);
  }

  async expectOpportunitiesListText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.opportunitiesList), expected, timeoutMs);
  }

  async expectOpportunitiesListContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.opportunitiesList), substring, timeoutMs);
  }

  async expectOpportunitiesListValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.opportunitiesList), value, timeoutMs);
  }

  async expectOpportunitiesListEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.opportunitiesList), timeoutMs);
  }

  async expectOpportunitiesListDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.opportunitiesList), timeoutMs);
  }

  async expectOpportunitiesListChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.opportunitiesList), timeoutMs);
  }

  async expectOpportunitiesListUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.opportunitiesList), timeoutMs);
  }

  async expectOpportunitiesListFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.opportunitiesList), timeoutMs);
  }

  async expectOpportunitiesListCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.opportunitiesList), count, timeoutMs);
  }

  async scrollOpportunitiesListIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.opportunitiesList));
  }

  async doubleClickQuotes(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.quotes));
  }

  async longPressQuotes(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.quotes));
  }

  async expectQuotesHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.quotes), timeoutMs);
  }

  async expectQuotesText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.quotes), expected, timeoutMs);
  }

  async expectQuotesContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.quotes), substring, timeoutMs);
  }

  async expectQuotesValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.quotes), value, timeoutMs);
  }

  async expectQuotesEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.quotes), timeoutMs);
  }

  async expectQuotesDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.quotes), timeoutMs);
  }

  async expectQuotesChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.quotes), timeoutMs);
  }

  async expectQuotesUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.quotes), timeoutMs);
  }

  async expectQuotesFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.quotes), timeoutMs);
  }

  async expectQuotesCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.quotes), count, timeoutMs);
  }

  async scrollQuotesIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.quotes));
  }

  async doubleClickQuotesList(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.quotesList));
  }

  async longPressQuotesList(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.quotesList));
  }

  async expectQuotesListHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.quotesList), timeoutMs);
  }

  async expectQuotesListText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.quotesList), expected, timeoutMs);
  }

  async expectQuotesListContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.quotesList), substring, timeoutMs);
  }

  async expectQuotesListValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.quotesList), value, timeoutMs);
  }

  async expectQuotesListEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.quotesList), timeoutMs);
  }

  async expectQuotesListDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.quotesList), timeoutMs);
  }

  async expectQuotesListChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.quotesList), timeoutMs);
  }

  async expectQuotesListUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.quotesList), timeoutMs);
  }

  async expectQuotesListFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.quotesList), timeoutMs);
  }

  async expectQuotesListCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.quotesList), count, timeoutMs);
  }

  async scrollQuotesListIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.quotesList));
  }

  async doubleClickQuoteTerms(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.quoteTerms));
  }

  async longPressQuoteTerms(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.quoteTerms));
  }

  async expectQuoteTermsHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.quoteTerms), timeoutMs);
  }

  async expectQuoteTermsText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.quoteTerms), expected, timeoutMs);
  }

  async expectQuoteTermsContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.quoteTerms), substring, timeoutMs);
  }

  async expectQuoteTermsValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.quoteTerms), value, timeoutMs);
  }

  async expectQuoteTermsEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.quoteTerms), timeoutMs);
  }

  async expectQuoteTermsDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.quoteTerms), timeoutMs);
  }

  async expectQuoteTermsChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.quoteTerms), timeoutMs);
  }

  async expectQuoteTermsUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.quoteTerms), timeoutMs);
  }

  async expectQuoteTermsFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.quoteTerms), timeoutMs);
  }

  async expectQuoteTermsCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.quoteTerms), count, timeoutMs);
  }

  async scrollQuoteTermsIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.quoteTerms));
  }

  async doubleClickQuoteTermsList(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.quoteTermsList));
  }

  async longPressQuoteTermsList(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.quoteTermsList));
  }

  async expectQuoteTermsListHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.quoteTermsList), timeoutMs);
  }

  async expectQuoteTermsListText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.quoteTermsList), expected, timeoutMs);
  }

  async expectQuoteTermsListContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.quoteTermsList), substring, timeoutMs);
  }

  async expectQuoteTermsListValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.quoteTermsList), value, timeoutMs);
  }

  async expectQuoteTermsListEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.quoteTermsList), timeoutMs);
  }

  async expectQuoteTermsListDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.quoteTermsList), timeoutMs);
  }

  async expectQuoteTermsListChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.quoteTermsList), timeoutMs);
  }

  async expectQuoteTermsListUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.quoteTermsList), timeoutMs);
  }

  async expectQuoteTermsListFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.quoteTermsList), timeoutMs);
  }

  async expectQuoteTermsListCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.quoteTermsList), count, timeoutMs);
  }

  async scrollQuoteTermsListIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.quoteTermsList));
  }

  async doubleClickOrders(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.orders));
  }

  async longPressOrders(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.orders));
  }

  async expectOrdersHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.orders), timeoutMs);
  }

  async expectOrdersText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.orders), expected, timeoutMs);
  }

  async expectOrdersContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.orders), substring, timeoutMs);
  }

  async expectOrdersValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.orders), value, timeoutMs);
  }

  async expectOrdersEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.orders), timeoutMs);
  }

  async expectOrdersDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.orders), timeoutMs);
  }

  async expectOrdersChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.orders), timeoutMs);
  }

  async expectOrdersUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.orders), timeoutMs);
  }

  async expectOrdersFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.orders), timeoutMs);
  }

  async expectOrdersCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.orders), count, timeoutMs);
  }

  async scrollOrdersIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.orders));
  }

  async doubleClickOrdersList(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.ordersList));
  }

  async longPressOrdersList(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.ordersList));
  }

  async expectOrdersListHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.ordersList), timeoutMs);
  }

  async expectOrdersListText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.ordersList), expected, timeoutMs);
  }

  async expectOrdersListContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.ordersList), substring, timeoutMs);
  }

  async expectOrdersListValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.ordersList), value, timeoutMs);
  }

  async expectOrdersListEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.ordersList), timeoutMs);
  }

  async expectOrdersListDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.ordersList), timeoutMs);
  }

  async expectOrdersListChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.ordersList), timeoutMs);
  }

  async expectOrdersListUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.ordersList), timeoutMs);
  }

  async expectOrdersListFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.ordersList), timeoutMs);
  }

  async expectOrdersListCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.ordersList), count, timeoutMs);
  }

  async scrollOrdersListIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.ordersList));
  }

  async doubleClickUnableToLoad(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.unableToLoad));
  }

  async longPressUnableToLoad(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.unableToLoad));
  }

  async expectUnableToLoadHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.unableToLoad), timeoutMs);
  }

  async expectUnableToLoadText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.unableToLoad), expected, timeoutMs);
  }

  async expectUnableToLoadContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.unableToLoad), substring, timeoutMs);
  }

  async expectUnableToLoadValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.unableToLoad), value, timeoutMs);
  }

  async expectUnableToLoadEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.unableToLoad), timeoutMs);
  }

  async expectUnableToLoadDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.unableToLoad), timeoutMs);
  }

  async expectUnableToLoadChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.unableToLoad), timeoutMs);
  }

  async expectUnableToLoadUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.unableToLoad), timeoutMs);
  }

  async expectUnableToLoadFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.unableToLoad), timeoutMs);
  }

  async expectUnableToLoadCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.unableToLoad), count, timeoutMs);
  }

  async scrollUnableToLoadIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.unableToLoad));
  }

  async doubleClickUnableToLoadList(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.unableToLoadList));
  }

  async longPressUnableToLoadList(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.unableToLoadList));
  }

  async expectUnableToLoadListHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.unableToLoadList), timeoutMs);
  }

  async expectUnableToLoadListText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.unableToLoadList), expected, timeoutMs);
  }

  async expectUnableToLoadListContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.unableToLoadList), substring, timeoutMs);
  }

  async expectUnableToLoadListValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.unableToLoadList), value, timeoutMs);
  }

  async expectUnableToLoadListEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.unableToLoadList), timeoutMs);
  }

  async expectUnableToLoadListDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.unableToLoadList), timeoutMs);
  }

  async expectUnableToLoadListChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.unableToLoadList), timeoutMs);
  }

  async expectUnableToLoadListUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.unableToLoadList), timeoutMs);
  }

  async expectUnableToLoadListFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.unableToLoadList), timeoutMs);
  }

  async expectUnableToLoadListCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.unableToLoadList), count, timeoutMs);
  }

  async scrollUnableToLoadListIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.unableToLoadList));
  }

  async longPressCloseTab(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.closeTab));
  }

  async expectCloseTabHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.closeTab), timeoutMs);
  }

  async expectCloseTabText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.closeTab), expected, timeoutMs);
  }

  async expectCloseTabContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.closeTab), substring, timeoutMs);
  }

  async expectCloseTabValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.closeTab), value, timeoutMs);
  }

  async expectCloseTabEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.closeTab), timeoutMs);
  }

  async expectCloseTabDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.closeTab), timeoutMs);
  }

  async expectCloseTabChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.closeTab), timeoutMs);
  }

  async expectCloseTabUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.closeTab), timeoutMs);
  }

  async expectCloseTabFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.closeTab), timeoutMs);
  }

  async expectCloseTabCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.closeTab), count, timeoutMs);
  }

  async scrollCloseTabIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.closeTab));
  }

  async doubleClickMoreShowMoreNavigation(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.moreShowMoreNavigation));
  }

  async longPressMoreShowMoreNavigation(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.moreShowMoreNavigation));
  }

  async expectMoreShowMoreNavigationHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.moreShowMoreNavigation), timeoutMs);
  }

  async expectMoreShowMoreNavigationText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.moreShowMoreNavigation), expected, timeoutMs);
  }

  async expectMoreShowMoreNavigationContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.moreShowMoreNavigation), substring, timeoutMs);
  }

  async expectMoreShowMoreNavigationValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.moreShowMoreNavigation), value, timeoutMs);
  }

  async expectMoreShowMoreNavigationEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.moreShowMoreNavigation), timeoutMs);
  }

  async expectMoreShowMoreNavigationDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.moreShowMoreNavigation), timeoutMs);
  }

  async expectMoreShowMoreNavigationChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.moreShowMoreNavigation), timeoutMs);
  }

  async expectMoreShowMoreNavigationUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.moreShowMoreNavigation), timeoutMs);
  }

  async expectMoreShowMoreNavigationFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.moreShowMoreNavigation), timeoutMs);
  }

  async expectMoreShowMoreNavigationCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.moreShowMoreNavigation), count, timeoutMs);
  }

  async scrollMoreShowMoreNavigationIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.moreShowMoreNavigation));
  }

  async longPressPersonalizeYourNavBar(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.personalizeYourNavBar));
  }

  async expectPersonalizeYourNavBarHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.personalizeYourNavBar), timeoutMs);
  }

  async expectPersonalizeYourNavBarText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.personalizeYourNavBar), expected, timeoutMs);
  }

  async expectPersonalizeYourNavBarContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.personalizeYourNavBar), substring, timeoutMs);
  }

  async expectPersonalizeYourNavBarValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.personalizeYourNavBar), value, timeoutMs);
  }

  async expectPersonalizeYourNavBarEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.personalizeYourNavBar), timeoutMs);
  }

  async expectPersonalizeYourNavBarDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.personalizeYourNavBar), timeoutMs);
  }

  async expectPersonalizeYourNavBarChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.personalizeYourNavBar), timeoutMs);
  }

  async expectPersonalizeYourNavBarUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.personalizeYourNavBar), timeoutMs);
  }

  async expectPersonalizeYourNavBarFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.personalizeYourNavBar), timeoutMs);
  }

  async expectPersonalizeYourNavBarCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.personalizeYourNavBar), count, timeoutMs);
  }

  async scrollPersonalizeYourNavBarIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.personalizeYourNavBar));
  }

  async clickTasks(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.tasks));
  }

  async doubleClickTasks(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.tasks));
  }

  async longPressTasks(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.tasks));
  }

  async expectTasksHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.tasks), timeoutMs);
  }

  async expectTasksText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.tasks), expected, timeoutMs);
  }

  async expectTasksContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.tasks), substring, timeoutMs);
  }

  async expectTasksValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.tasks), value, timeoutMs);
  }

  async expectTasksEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.tasks), timeoutMs);
  }

  async expectTasksDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.tasks), timeoutMs);
  }

  async expectTasksChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.tasks), timeoutMs);
  }

  async expectTasksUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.tasks), timeoutMs);
  }

  async expectTasksFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.tasks), timeoutMs);
  }

  async expectTasksCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.tasks), count, timeoutMs);
  }

  async scrollTasksIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.tasks));
  }

  async doubleClickMyOpenTasksEditable(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.myOpenTasksEditable));
  }

  async longPressMyOpenTasksEditable(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.myOpenTasksEditable));
  }

  async expectMyOpenTasksEditableHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.myOpenTasksEditable), timeoutMs);
  }

  async expectMyOpenTasksEditableText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.myOpenTasksEditable), expected, timeoutMs);
  }

  async expectMyOpenTasksEditableContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.myOpenTasksEditable), substring, timeoutMs);
  }

  async expectMyOpenTasksEditableValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.myOpenTasksEditable), value, timeoutMs);
  }

  async expectMyOpenTasksEditableEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.myOpenTasksEditable), timeoutMs);
  }

  async expectMyOpenTasksEditableDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.myOpenTasksEditable), timeoutMs);
  }

  async expectMyOpenTasksEditableChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.myOpenTasksEditable), timeoutMs);
  }

  async expectMyOpenTasksEditableUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.myOpenTasksEditable), timeoutMs);
  }

  async expectMyOpenTasksEditableFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.myOpenTasksEditable), timeoutMs);
  }

  async expectMyOpenTasksEditableCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.myOpenTasksEditable), count, timeoutMs);
  }

  async scrollMyOpenTasksEditableIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.myOpenTasksEditable));
  }

  async doubleClickNewTask(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.newTask));
  }

  async longPressNewTask(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.newTask));
  }

  async expectNewTaskHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.newTask), timeoutMs);
  }

  async expectNewTaskText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.newTask), expected, timeoutMs);
  }

  async expectNewTaskContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.newTask), substring, timeoutMs);
  }

  async expectNewTaskValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.newTask), value, timeoutMs);
  }

  async expectNewTaskEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.newTask), timeoutMs);
  }

  async expectNewTaskDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.newTask), timeoutMs);
  }

  async expectNewTaskChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.newTask), timeoutMs);
  }

  async expectNewTaskUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.newTask), timeoutMs);
  }

  async expectNewTaskFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.newTask), timeoutMs);
  }

  async expectNewTaskCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.newTask), count, timeoutMs);
  }

  async scrollNewTaskIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.newTask));
  }

  async doubleClickAssignLabel(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.assignLabel));
  }

  async longPressAssignLabel(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.assignLabel));
  }

  async expectAssignLabelHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.assignLabel), timeoutMs);
  }

  async expectAssignLabelText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.assignLabel), expected, timeoutMs);
  }

  async expectAssignLabelContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.assignLabel), substring, timeoutMs);
  }

  async expectAssignLabelValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.assignLabel), value, timeoutMs);
  }

  async expectAssignLabelEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.assignLabel), timeoutMs);
  }

  async expectAssignLabelDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.assignLabel), timeoutMs);
  }

  async expectAssignLabelChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.assignLabel), timeoutMs);
  }

  async expectAssignLabelUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.assignLabel), timeoutMs);
  }

  async expectAssignLabelFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.assignLabel), timeoutMs);
  }

  async expectAssignLabelCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.assignLabel), count, timeoutMs);
  }

  async scrollAssignLabelIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.assignLabel));
  }

  async clickItemsSorted(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.itemsSorted));
  }

  async doubleClickItemsSorted(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.itemsSorted));
  }

  async longPressItemsSorted(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.itemsSorted));
  }

  async expectItemsSortedHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.itemsSorted), timeoutMs);
  }

  async expectItemsSortedText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.itemsSorted), expected, timeoutMs);
  }

  async expectItemsSortedContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.itemsSorted), substring, timeoutMs);
  }

  async expectItemsSortedValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.itemsSorted), value, timeoutMs);
  }

  async expectItemsSortedEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.itemsSorted), timeoutMs);
  }

  async expectItemsSortedDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.itemsSorted), timeoutMs);
  }

  async expectItemsSortedChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.itemsSorted), timeoutMs);
  }

  async expectItemsSortedUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.itemsSorted), timeoutMs);
  }

  async expectItemsSortedFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.itemsSorted), timeoutMs);
  }

  async expectItemsSortedCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.itemsSorted), count, timeoutMs);
  }

  async scrollItemsSortedIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.itemsSorted));
  }

  async clickUpdatedAMinuteAgo(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.updatedAMinuteAgo));
  }

  async doubleClickUpdatedAMinuteAgo(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.updatedAMinuteAgo));
  }

  async longPressUpdatedAMinuteAgo(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.updatedAMinuteAgo));
  }

  async expectUpdatedAMinuteAgoHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.updatedAMinuteAgo), timeoutMs);
  }

  async expectUpdatedAMinuteAgoText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.updatedAMinuteAgo), expected, timeoutMs);
  }

  async expectUpdatedAMinuteAgoContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.updatedAMinuteAgo), substring, timeoutMs);
  }

  async expectUpdatedAMinuteAgoValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.updatedAMinuteAgo), value, timeoutMs);
  }

  async expectUpdatedAMinuteAgoEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.updatedAMinuteAgo), timeoutMs);
  }

  async expectUpdatedAMinuteAgoDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.updatedAMinuteAgo), timeoutMs);
  }

  async expectUpdatedAMinuteAgoChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.updatedAMinuteAgo), timeoutMs);
  }

  async expectUpdatedAMinuteAgoUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.updatedAMinuteAgo), timeoutMs);
  }

  async expectUpdatedAMinuteAgoFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.updatedAMinuteAgo), timeoutMs);
  }

  async expectUpdatedAMinuteAgoCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.updatedAMinuteAgo), count, timeoutMs);
  }

  async scrollUpdatedAMinuteAgoIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.updatedAMinuteAgo));
  }

  async typeTextSearchThisList(value: string): Promise<void> {
    await typeTextWhenVisible(webLocator(this.page, HomePage.L.searchThisList), value);
  }

  async expectSearchThisListHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.searchThisList), timeoutMs);
  }

  async expectSearchThisListText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.searchThisList), expected, timeoutMs);
  }

  async expectSearchThisListContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.searchThisList), substring, timeoutMs);
  }

  async expectSearchThisListValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.searchThisList), value, timeoutMs);
  }

  async expectSearchThisListEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.searchThisList), timeoutMs);
  }

  async expectSearchThisListDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.searchThisList), timeoutMs);
  }

  async expectSearchThisListChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.searchThisList), timeoutMs);
  }

  async expectSearchThisListUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.searchThisList), timeoutMs);
  }

  async expectSearchThisListFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.searchThisList), timeoutMs);
  }

  async expectSearchThisListCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.searchThisList), count, timeoutMs);
  }

  async scrollSearchThisListIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.searchThisList));
  }

  async longPressListViewControls(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.listViewControls));
  }

  async expectListViewControlsHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.listViewControls), timeoutMs);
  }

  async expectListViewControlsText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.listViewControls), expected, timeoutMs);
  }

  async expectListViewControlsContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.listViewControls), substring, timeoutMs);
  }

  async expectListViewControlsValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.listViewControls), value, timeoutMs);
  }

  async expectListViewControlsEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.listViewControls), timeoutMs);
  }

  async expectListViewControlsDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.listViewControls), timeoutMs);
  }

  async expectListViewControlsChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.listViewControls), timeoutMs);
  }

  async expectListViewControlsUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.listViewControls), timeoutMs);
  }

  async expectListViewControlsFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.listViewControls), timeoutMs);
  }

  async expectListViewControlsCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.listViewControls), count, timeoutMs);
  }

  async scrollListViewControlsIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.listViewControls));
  }

  async longPressRefreshButton(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.refreshButton));
  }

  async expectRefreshButtonHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.refreshButton), timeoutMs);
  }

  async expectRefreshButtonText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.refreshButton), expected, timeoutMs);
  }

  async expectRefreshButtonContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.refreshButton), substring, timeoutMs);
  }

  async expectRefreshButtonValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.refreshButton), value, timeoutMs);
  }

  async expectRefreshButtonEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.refreshButton), timeoutMs);
  }

  async expectRefreshButtonDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.refreshButton), timeoutMs);
  }

  async expectRefreshButtonChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.refreshButton), timeoutMs);
  }

  async expectRefreshButtonUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.refreshButton), timeoutMs);
  }

  async expectRefreshButtonFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.refreshButton), timeoutMs);
  }

  async expectRefreshButtonCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.refreshButton), count, timeoutMs);
  }

  async scrollRefreshButtonIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.refreshButton));
  }

  async longPressInlineEditButton(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.inlineEditButton));
  }

  async expectInlineEditButtonHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.inlineEditButton), timeoutMs);
  }

  async expectInlineEditButtonText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.inlineEditButton), expected, timeoutMs);
  }

  async expectInlineEditButtonContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.inlineEditButton), substring, timeoutMs);
  }

  async expectInlineEditButtonValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.inlineEditButton), value, timeoutMs);
  }

  async expectInlineEditButtonEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.inlineEditButton), timeoutMs);
  }

  async expectInlineEditButtonDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.inlineEditButton), timeoutMs);
  }

  async expectInlineEditButtonChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.inlineEditButton), timeoutMs);
  }

  async expectInlineEditButtonUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.inlineEditButton), timeoutMs);
  }

  async expectInlineEditButtonFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.inlineEditButton), timeoutMs);
  }

  async expectInlineEditButtonCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.inlineEditButton), count, timeoutMs);
  }

  async scrollInlineEditButtonIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.inlineEditButton));
  }

  async doubleClickSortDueDate(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.sortDueDate));
  }

  async longPressSortDueDate(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.sortDueDate));
  }

  async expectSortDueDateHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.sortDueDate), timeoutMs);
  }

  async expectSortDueDateText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.sortDueDate), expected, timeoutMs);
  }

  async expectSortDueDateContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.sortDueDate), substring, timeoutMs);
  }

  async expectSortDueDateValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.sortDueDate), value, timeoutMs);
  }

  async expectSortDueDateEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.sortDueDate), timeoutMs);
  }

  async expectSortDueDateDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.sortDueDate), timeoutMs);
  }

  async expectSortDueDateChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.sortDueDate), timeoutMs);
  }

  async expectSortDueDateUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.sortDueDate), timeoutMs);
  }

  async expectSortDueDateFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.sortDueDate), timeoutMs);
  }

  async expectSortDueDateCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.sortDueDate), count, timeoutMs);
  }

  async scrollSortDueDateIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.sortDueDate));
  }

  async longPressShowDueDateColumn(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.showDueDateColumn));
  }

  async expectShowDueDateColumnHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.showDueDateColumn), timeoutMs);
  }

  async expectShowDueDateColumnText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.showDueDateColumn), expected, timeoutMs);
  }

  async expectShowDueDateColumnContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.showDueDateColumn), substring, timeoutMs);
  }

  async expectShowDueDateColumnValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.showDueDateColumn), value, timeoutMs);
  }

  async expectShowDueDateColumnEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.showDueDateColumn), timeoutMs);
  }

  async expectShowDueDateColumnDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.showDueDateColumn), timeoutMs);
  }

  async expectShowDueDateColumnChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.showDueDateColumn), timeoutMs);
  }

  async expectShowDueDateColumnUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.showDueDateColumn), timeoutMs);
  }

  async expectShowDueDateColumnFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.showDueDateColumn), timeoutMs);
  }

  async expectShowDueDateColumnCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.showDueDateColumn), count, timeoutMs);
  }

  async scrollShowDueDateColumnIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.showDueDateColumn));
  }

  async doubleClickDueDateColumnWidth(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.dueDateColumnWidth));
  }

  async longPressDueDateColumnWidth(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.dueDateColumnWidth));
  }

  async expectDueDateColumnWidthHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.dueDateColumnWidth), timeoutMs);
  }

  async expectDueDateColumnWidthText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.dueDateColumnWidth), expected, timeoutMs);
  }

  async expectDueDateColumnWidthContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.dueDateColumnWidth), substring, timeoutMs);
  }

  async expectDueDateColumnWidthValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.dueDateColumnWidth), value, timeoutMs);
  }

  async expectDueDateColumnWidthEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.dueDateColumnWidth), timeoutMs);
  }

  async expectDueDateColumnWidthDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.dueDateColumnWidth), timeoutMs);
  }

  async expectDueDateColumnWidthChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.dueDateColumnWidth), timeoutMs);
  }

  async expectDueDateColumnWidthUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.dueDateColumnWidth), timeoutMs);
  }

  async expectDueDateColumnWidthFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.dueDateColumnWidth), timeoutMs);
  }

  async expectDueDateColumnWidthCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.dueDateColumnWidth), count, timeoutMs);
  }

  async scrollDueDateColumnWidthIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.dueDateColumnWidth));
  }

  async doubleClickSortSubject(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.sortSubject));
  }

  async longPressSortSubject(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.sortSubject));
  }

  async expectSortSubjectHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.sortSubject), timeoutMs);
  }

  async expectSortSubjectText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.sortSubject), expected, timeoutMs);
  }

  async expectSortSubjectContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.sortSubject), substring, timeoutMs);
  }

  async expectSortSubjectValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.sortSubject), value, timeoutMs);
  }

  async expectSortSubjectEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.sortSubject), timeoutMs);
  }

  async expectSortSubjectDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.sortSubject), timeoutMs);
  }

  async expectSortSubjectChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.sortSubject), timeoutMs);
  }

  async expectSortSubjectUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.sortSubject), timeoutMs);
  }

  async expectSortSubjectFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.sortSubject), timeoutMs);
  }

  async expectSortSubjectCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.sortSubject), count, timeoutMs);
  }

  async scrollSortSubjectIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.sortSubject));
  }

  async longPressShowSubjectColumnActions(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.showSubjectColumnActions));
  }

  async expectShowSubjectColumnActionsHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.showSubjectColumnActions), timeoutMs);
  }

  async expectShowSubjectColumnActionsText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.showSubjectColumnActions), expected, timeoutMs);
  }

  async expectShowSubjectColumnActionsContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.showSubjectColumnActions), substring, timeoutMs);
  }

  async expectShowSubjectColumnActionsValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.showSubjectColumnActions), value, timeoutMs);
  }

  async expectShowSubjectColumnActionsEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.showSubjectColumnActions), timeoutMs);
  }

  async expectShowSubjectColumnActionsDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.showSubjectColumnActions), timeoutMs);
  }

  async expectShowSubjectColumnActionsChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.showSubjectColumnActions), timeoutMs);
  }

  async expectShowSubjectColumnActionsUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.showSubjectColumnActions), timeoutMs);
  }

  async expectShowSubjectColumnActionsFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.showSubjectColumnActions), timeoutMs);
  }

  async expectShowSubjectColumnActionsCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.showSubjectColumnActions), count, timeoutMs);
  }

  async scrollShowSubjectColumnActionsIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.showSubjectColumnActions));
  }

  async doubleClickSubjectColumnWidth(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.subjectColumnWidth));
  }

  async longPressSubjectColumnWidth(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.subjectColumnWidth));
  }

  async expectSubjectColumnWidthHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.subjectColumnWidth), timeoutMs);
  }

  async expectSubjectColumnWidthText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.subjectColumnWidth), expected, timeoutMs);
  }

  async expectSubjectColumnWidthContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.subjectColumnWidth), substring, timeoutMs);
  }

  async expectSubjectColumnWidthValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.subjectColumnWidth), value, timeoutMs);
  }

  async expectSubjectColumnWidthEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.subjectColumnWidth), timeoutMs);
  }

  async expectSubjectColumnWidthDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.subjectColumnWidth), timeoutMs);
  }

  async expectSubjectColumnWidthChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.subjectColumnWidth), timeoutMs);
  }

  async expectSubjectColumnWidthUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.subjectColumnWidth), timeoutMs);
  }

  async expectSubjectColumnWidthFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.subjectColumnWidth), timeoutMs);
  }

  async expectSubjectColumnWidthCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.subjectColumnWidth), count, timeoutMs);
  }

  async scrollSubjectColumnWidthIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.subjectColumnWidth));
  }

  async doubleClickSortName(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.sortName));
  }

  async longPressSortName(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.sortName));
  }

  async expectSortNameHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.sortName), timeoutMs);
  }

  async expectSortNameText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.sortName), expected, timeoutMs);
  }

  async expectSortNameContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.sortName), substring, timeoutMs);
  }

  async expectSortNameValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.sortName), value, timeoutMs);
  }

  async expectSortNameEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.sortName), timeoutMs);
  }

  async expectSortNameDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.sortName), timeoutMs);
  }

  async expectSortNameChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.sortName), timeoutMs);
  }

  async expectSortNameUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.sortName), timeoutMs);
  }

  async expectSortNameFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.sortName), timeoutMs);
  }

  async expectSortNameCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.sortName), count, timeoutMs);
  }

  async scrollSortNameIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.sortName));
  }

  async longPressShowNameColumnActions(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.showNameColumnActions));
  }

  async expectShowNameColumnActionsHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.showNameColumnActions), timeoutMs);
  }

  async expectShowNameColumnActionsText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.showNameColumnActions), expected, timeoutMs);
  }

  async expectShowNameColumnActionsContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.showNameColumnActions), substring, timeoutMs);
  }

  async expectShowNameColumnActionsValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.showNameColumnActions), value, timeoutMs);
  }

  async expectShowNameColumnActionsEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.showNameColumnActions), timeoutMs);
  }

  async expectShowNameColumnActionsDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.showNameColumnActions), timeoutMs);
  }

  async expectShowNameColumnActionsChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.showNameColumnActions), timeoutMs);
  }

  async expectShowNameColumnActionsUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.showNameColumnActions), timeoutMs);
  }

  async expectShowNameColumnActionsFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.showNameColumnActions), timeoutMs);
  }

  async expectShowNameColumnActionsCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.showNameColumnActions), count, timeoutMs);
  }

  async scrollShowNameColumnActionsIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.showNameColumnActions));
  }

  async doubleClickNameColumnWidth(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.nameColumnWidth));
  }

  async longPressNameColumnWidth(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.nameColumnWidth));
  }

  async expectNameColumnWidthHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.nameColumnWidth), timeoutMs);
  }

  async expectNameColumnWidthText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.nameColumnWidth), expected, timeoutMs);
  }

  async expectNameColumnWidthContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.nameColumnWidth), substring, timeoutMs);
  }

  async expectNameColumnWidthValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.nameColumnWidth), value, timeoutMs);
  }

  async expectNameColumnWidthEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.nameColumnWidth), timeoutMs);
  }

  async expectNameColumnWidthDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.nameColumnWidth), timeoutMs);
  }

  async expectNameColumnWidthChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.nameColumnWidth), timeoutMs);
  }

  async expectNameColumnWidthUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.nameColumnWidth), timeoutMs);
  }

  async expectNameColumnWidthFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.nameColumnWidth), timeoutMs);
  }

  async expectNameColumnWidthCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.nameColumnWidth), count, timeoutMs);
  }

  async scrollNameColumnWidthIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.nameColumnWidth));
  }

  async doubleClickSortRelatedTo(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.sortRelatedTo));
  }

  async longPressSortRelatedTo(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.sortRelatedTo));
  }

  async expectSortRelatedToHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.sortRelatedTo), timeoutMs);
  }

  async expectSortRelatedToText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.sortRelatedTo), expected, timeoutMs);
  }

  async expectSortRelatedToContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.sortRelatedTo), substring, timeoutMs);
  }

  async expectSortRelatedToValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.sortRelatedTo), value, timeoutMs);
  }

  async expectSortRelatedToEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.sortRelatedTo), timeoutMs);
  }

  async expectSortRelatedToDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.sortRelatedTo), timeoutMs);
  }

  async expectSortRelatedToChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.sortRelatedTo), timeoutMs);
  }

  async expectSortRelatedToUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.sortRelatedTo), timeoutMs);
  }

  async expectSortRelatedToFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.sortRelatedTo), timeoutMs);
  }

  async expectSortRelatedToCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.sortRelatedTo), count, timeoutMs);
  }

  async scrollSortRelatedToIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.sortRelatedTo));
  }

  async longPressShowRelatedToColumn(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.showRelatedToColumn));
  }

  async expectShowRelatedToColumnHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.showRelatedToColumn), timeoutMs);
  }

  async expectShowRelatedToColumnText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.showRelatedToColumn), expected, timeoutMs);
  }

  async expectShowRelatedToColumnContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.showRelatedToColumn), substring, timeoutMs);
  }

  async expectShowRelatedToColumnValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.showRelatedToColumn), value, timeoutMs);
  }

  async expectShowRelatedToColumnEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.showRelatedToColumn), timeoutMs);
  }

  async expectShowRelatedToColumnDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.showRelatedToColumn), timeoutMs);
  }

  async expectShowRelatedToColumnChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.showRelatedToColumn), timeoutMs);
  }

  async expectShowRelatedToColumnUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.showRelatedToColumn), timeoutMs);
  }

  async expectShowRelatedToColumnFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.showRelatedToColumn), timeoutMs);
  }

  async expectShowRelatedToColumnCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.showRelatedToColumn), count, timeoutMs);
  }

  async scrollShowRelatedToColumnIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.showRelatedToColumn));
  }

  async doubleClickRelatedToColumnWidth(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.relatedToColumnWidth));
  }

  async longPressRelatedToColumnWidth(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.relatedToColumnWidth));
  }

  async expectRelatedToColumnWidthHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.relatedToColumnWidth), timeoutMs);
  }

  async expectRelatedToColumnWidthText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.relatedToColumnWidth), expected, timeoutMs);
  }

  async expectRelatedToColumnWidthContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.relatedToColumnWidth), substring, timeoutMs);
  }

  async expectRelatedToColumnWidthValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.relatedToColumnWidth), value, timeoutMs);
  }

  async expectRelatedToColumnWidthEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.relatedToColumnWidth), timeoutMs);
  }

  async expectRelatedToColumnWidthDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.relatedToColumnWidth), timeoutMs);
  }

  async expectRelatedToColumnWidthChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.relatedToColumnWidth), timeoutMs);
  }

  async expectRelatedToColumnWidthUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.relatedToColumnWidth), timeoutMs);
  }

  async expectRelatedToColumnWidthFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.relatedToColumnWidth), timeoutMs);
  }

  async expectRelatedToColumnWidthCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.relatedToColumnWidth), count, timeoutMs);
  }

  async scrollRelatedToColumnWidthIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.relatedToColumnWidth));
  }

  async doubleClickSortUkgActivityType(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.sortUkgActivityType));
  }

  async longPressSortUkgActivityType(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.sortUkgActivityType));
  }

  async expectSortUkgActivityTypeHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.sortUkgActivityType), timeoutMs);
  }

  async expectSortUkgActivityTypeText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.sortUkgActivityType), expected, timeoutMs);
  }

  async expectSortUkgActivityTypeContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.sortUkgActivityType), substring, timeoutMs);
  }

  async expectSortUkgActivityTypeValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.sortUkgActivityType), value, timeoutMs);
  }

  async expectSortUkgActivityTypeEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.sortUkgActivityType), timeoutMs);
  }

  async expectSortUkgActivityTypeDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.sortUkgActivityType), timeoutMs);
  }

  async expectSortUkgActivityTypeChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.sortUkgActivityType), timeoutMs);
  }

  async expectSortUkgActivityTypeUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.sortUkgActivityType), timeoutMs);
  }

  async expectSortUkgActivityTypeFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.sortUkgActivityType), timeoutMs);
  }

  async expectSortUkgActivityTypeCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.sortUkgActivityType), count, timeoutMs);
  }

  async scrollSortUkgActivityTypeIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.sortUkgActivityType));
  }

  async longPressShowUkgActivityType(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.showUkgActivityType));
  }

  async expectShowUkgActivityTypeHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.showUkgActivityType), timeoutMs);
  }

  async expectShowUkgActivityTypeText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.showUkgActivityType), expected, timeoutMs);
  }

  async expectShowUkgActivityTypeContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.showUkgActivityType), substring, timeoutMs);
  }

  async expectShowUkgActivityTypeValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.showUkgActivityType), value, timeoutMs);
  }

  async expectShowUkgActivityTypeEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.showUkgActivityType), timeoutMs);
  }

  async expectShowUkgActivityTypeDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.showUkgActivityType), timeoutMs);
  }

  async expectShowUkgActivityTypeChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.showUkgActivityType), timeoutMs);
  }

  async expectShowUkgActivityTypeUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.showUkgActivityType), timeoutMs);
  }

  async expectShowUkgActivityTypeFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.showUkgActivityType), timeoutMs);
  }

  async expectShowUkgActivityTypeCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.showUkgActivityType), count, timeoutMs);
  }

  async scrollShowUkgActivityTypeIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.showUkgActivityType));
  }

  async doubleClickUkgActivityTypeColumn(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.ukgActivityTypeColumn));
  }

  async longPressUkgActivityTypeColumn(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.ukgActivityTypeColumn));
  }

  async expectUkgActivityTypeColumnHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.ukgActivityTypeColumn), timeoutMs);
  }

  async expectUkgActivityTypeColumnText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.ukgActivityTypeColumn), expected, timeoutMs);
  }

  async expectUkgActivityTypeColumnContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.ukgActivityTypeColumn), substring, timeoutMs);
  }

  async expectUkgActivityTypeColumnValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.ukgActivityTypeColumn), value, timeoutMs);
  }

  async expectUkgActivityTypeColumnEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.ukgActivityTypeColumn), timeoutMs);
  }

  async expectUkgActivityTypeColumnDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.ukgActivityTypeColumn), timeoutMs);
  }

  async expectUkgActivityTypeColumnChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.ukgActivityTypeColumn), timeoutMs);
  }

  async expectUkgActivityTypeColumnUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.ukgActivityTypeColumn), timeoutMs);
  }

  async expectUkgActivityTypeColumnFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.ukgActivityTypeColumn), timeoutMs);
  }

  async expectUkgActivityTypeColumnCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.ukgActivityTypeColumn), count, timeoutMs);
  }

  async scrollUkgActivityTypeColumnIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.ukgActivityTypeColumn));
  }

  async doubleClickSortTypeDetail(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.sortTypeDetail));
  }

  async longPressSortTypeDetail(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.sortTypeDetail));
  }

  async expectSortTypeDetailHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.sortTypeDetail), timeoutMs);
  }

  async expectSortTypeDetailText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.sortTypeDetail), expected, timeoutMs);
  }

  async expectSortTypeDetailContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.sortTypeDetail), substring, timeoutMs);
  }

  async expectSortTypeDetailValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.sortTypeDetail), value, timeoutMs);
  }

  async expectSortTypeDetailEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.sortTypeDetail), timeoutMs);
  }

  async expectSortTypeDetailDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.sortTypeDetail), timeoutMs);
  }

  async expectSortTypeDetailChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.sortTypeDetail), timeoutMs);
  }

  async expectSortTypeDetailUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.sortTypeDetail), timeoutMs);
  }

  async expectSortTypeDetailFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.sortTypeDetail), timeoutMs);
  }

  async expectSortTypeDetailCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.sortTypeDetail), count, timeoutMs);
  }

  async scrollSortTypeDetailIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.sortTypeDetail));
  }

  async longPressShowTypeDetailColumn(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.showTypeDetailColumn));
  }

  async expectShowTypeDetailColumnHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.showTypeDetailColumn), timeoutMs);
  }

  async expectShowTypeDetailColumnText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.showTypeDetailColumn), expected, timeoutMs);
  }

  async expectShowTypeDetailColumnContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.showTypeDetailColumn), substring, timeoutMs);
  }

  async expectShowTypeDetailColumnValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.showTypeDetailColumn), value, timeoutMs);
  }

  async expectShowTypeDetailColumnEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.showTypeDetailColumn), timeoutMs);
  }

  async expectShowTypeDetailColumnDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.showTypeDetailColumn), timeoutMs);
  }

  async expectShowTypeDetailColumnChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.showTypeDetailColumn), timeoutMs);
  }

  async expectShowTypeDetailColumnUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.showTypeDetailColumn), timeoutMs);
  }

  async expectShowTypeDetailColumnFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.showTypeDetailColumn), timeoutMs);
  }

  async expectShowTypeDetailColumnCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.showTypeDetailColumn), count, timeoutMs);
  }

  async scrollShowTypeDetailColumnIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.showTypeDetailColumn));
  }

  async doubleClickTypeDetailColumnWidth(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.typeDetailColumnWidth));
  }

  async longPressTypeDetailColumnWidth(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.typeDetailColumnWidth));
  }

  async expectTypeDetailColumnWidthHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.typeDetailColumnWidth), timeoutMs);
  }

  async expectTypeDetailColumnWidthText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.typeDetailColumnWidth), expected, timeoutMs);
  }

  async expectTypeDetailColumnWidthContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.typeDetailColumnWidth), substring, timeoutMs);
  }

  async expectTypeDetailColumnWidthValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.typeDetailColumnWidth), value, timeoutMs);
  }

  async expectTypeDetailColumnWidthEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.typeDetailColumnWidth), timeoutMs);
  }

  async expectTypeDetailColumnWidthDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.typeDetailColumnWidth), timeoutMs);
  }

  async expectTypeDetailColumnWidthChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.typeDetailColumnWidth), timeoutMs);
  }

  async expectTypeDetailColumnWidthUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.typeDetailColumnWidth), timeoutMs);
  }

  async expectTypeDetailColumnWidthFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.typeDetailColumnWidth), timeoutMs);
  }

  async expectTypeDetailColumnWidthCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.typeDetailColumnWidth), count, timeoutMs);
  }

  async scrollTypeDetailColumnWidthIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.typeDetailColumnWidth));
  }

  async doubleClickSortDisposition(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.sortDisposition));
  }

  async longPressSortDisposition(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.sortDisposition));
  }

  async expectSortDispositionHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.sortDisposition), timeoutMs);
  }

  async expectSortDispositionText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.sortDisposition), expected, timeoutMs);
  }

  async expectSortDispositionContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.sortDisposition), substring, timeoutMs);
  }

  async expectSortDispositionValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.sortDisposition), value, timeoutMs);
  }

  async expectSortDispositionEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.sortDisposition), timeoutMs);
  }

  async expectSortDispositionDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.sortDisposition), timeoutMs);
  }

  async expectSortDispositionChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.sortDisposition), timeoutMs);
  }

  async expectSortDispositionUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.sortDisposition), timeoutMs);
  }

  async expectSortDispositionFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.sortDisposition), timeoutMs);
  }

  async expectSortDispositionCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.sortDisposition), count, timeoutMs);
  }

  async scrollSortDispositionIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.sortDisposition));
  }

  async longPressShowDispositionColumnActions(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.showDispositionColumnActions));
  }

  async expectShowDispositionColumnActionsHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.showDispositionColumnActions), timeoutMs);
  }

  async expectShowDispositionColumnActionsText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.showDispositionColumnActions), expected, timeoutMs);
  }

  async expectShowDispositionColumnActionsContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.showDispositionColumnActions), substring, timeoutMs);
  }

  async expectShowDispositionColumnActionsValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.showDispositionColumnActions), value, timeoutMs);
  }

  async expectShowDispositionColumnActionsEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.showDispositionColumnActions), timeoutMs);
  }

  async expectShowDispositionColumnActionsDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.showDispositionColumnActions), timeoutMs);
  }

  async expectShowDispositionColumnActionsChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.showDispositionColumnActions), timeoutMs);
  }

  async expectShowDispositionColumnActionsUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.showDispositionColumnActions), timeoutMs);
  }

  async expectShowDispositionColumnActionsFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.showDispositionColumnActions), timeoutMs);
  }

  async expectShowDispositionColumnActionsCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.showDispositionColumnActions), count, timeoutMs);
  }

  async scrollShowDispositionColumnActionsIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.showDispositionColumnActions));
  }

  async doubleClickDispositionColumnWidth(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.dispositionColumnWidth));
  }

  async longPressDispositionColumnWidth(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.dispositionColumnWidth));
  }

  async expectDispositionColumnWidthHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.dispositionColumnWidth), timeoutMs);
  }

  async expectDispositionColumnWidthText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.dispositionColumnWidth), expected, timeoutMs);
  }

  async expectDispositionColumnWidthContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.dispositionColumnWidth), substring, timeoutMs);
  }

  async expectDispositionColumnWidthValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.dispositionColumnWidth), value, timeoutMs);
  }

  async expectDispositionColumnWidthEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.dispositionColumnWidth), timeoutMs);
  }

  async expectDispositionColumnWidthDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.dispositionColumnWidth), timeoutMs);
  }

  async expectDispositionColumnWidthChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.dispositionColumnWidth), timeoutMs);
  }

  async expectDispositionColumnWidthUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.dispositionColumnWidth), timeoutMs);
  }

  async expectDispositionColumnWidthFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.dispositionColumnWidth), timeoutMs);
  }

  async expectDispositionColumnWidthCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.dispositionColumnWidth), count, timeoutMs);
  }

  async scrollDispositionColumnWidthIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.dispositionColumnWidth));
  }

  async doubleClickSortPriority(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.sortPriority));
  }

  async longPressSortPriority(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.sortPriority));
  }

  async expectSortPriorityHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.sortPriority), timeoutMs);
  }

  async expectSortPriorityText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.sortPriority), expected, timeoutMs);
  }

  async expectSortPriorityContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.sortPriority), substring, timeoutMs);
  }

  async expectSortPriorityValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.sortPriority), value, timeoutMs);
  }

  async expectSortPriorityEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.sortPriority), timeoutMs);
  }

  async expectSortPriorityDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.sortPriority), timeoutMs);
  }

  async expectSortPriorityChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.sortPriority), timeoutMs);
  }

  async expectSortPriorityUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.sortPriority), timeoutMs);
  }

  async expectSortPriorityFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.sortPriority), timeoutMs);
  }

  async expectSortPriorityCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.sortPriority), count, timeoutMs);
  }

  async scrollSortPriorityIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.sortPriority));
  }

  async longPressShowPriorityColumnActions(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.showPriorityColumnActions));
  }

  async expectShowPriorityColumnActionsHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.showPriorityColumnActions), timeoutMs);
  }

  async expectShowPriorityColumnActionsText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.showPriorityColumnActions), expected, timeoutMs);
  }

  async expectShowPriorityColumnActionsContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.showPriorityColumnActions), substring, timeoutMs);
  }

  async expectShowPriorityColumnActionsValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.showPriorityColumnActions), value, timeoutMs);
  }

  async expectShowPriorityColumnActionsEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.showPriorityColumnActions), timeoutMs);
  }

  async expectShowPriorityColumnActionsDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.showPriorityColumnActions), timeoutMs);
  }

  async expectShowPriorityColumnActionsChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.showPriorityColumnActions), timeoutMs);
  }

  async expectShowPriorityColumnActionsUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.showPriorityColumnActions), timeoutMs);
  }

  async expectShowPriorityColumnActionsFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.showPriorityColumnActions), timeoutMs);
  }

  async expectShowPriorityColumnActionsCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.showPriorityColumnActions), count, timeoutMs);
  }

  async scrollShowPriorityColumnActionsIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.showPriorityColumnActions));
  }

  async doubleClickPriorityColumnWidth(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.priorityColumnWidth));
  }

  async longPressPriorityColumnWidth(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.priorityColumnWidth));
  }

  async expectPriorityColumnWidthHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.priorityColumnWidth), timeoutMs);
  }

  async expectPriorityColumnWidthText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.priorityColumnWidth), expected, timeoutMs);
  }

  async expectPriorityColumnWidthContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.priorityColumnWidth), substring, timeoutMs);
  }

  async expectPriorityColumnWidthValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.priorityColumnWidth), value, timeoutMs);
  }

  async expectPriorityColumnWidthEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.priorityColumnWidth), timeoutMs);
  }

  async expectPriorityColumnWidthDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.priorityColumnWidth), timeoutMs);
  }

  async expectPriorityColumnWidthChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.priorityColumnWidth), timeoutMs);
  }

  async expectPriorityColumnWidthUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.priorityColumnWidth), timeoutMs);
  }

  async expectPriorityColumnWidthFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.priorityColumnWidth), timeoutMs);
  }

  async expectPriorityColumnWidthCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.priorityColumnWidth), count, timeoutMs);
  }

  async scrollPriorityColumnWidthIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.priorityColumnWidth));
  }

  async doubleClickSortStatus(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.sortStatus));
  }

  async longPressSortStatus(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.sortStatus));
  }

  async expectSortStatusHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.sortStatus), timeoutMs);
  }

  async expectSortStatusText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.sortStatus), expected, timeoutMs);
  }

  async expectSortStatusContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.sortStatus), substring, timeoutMs);
  }

  async expectSortStatusValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.sortStatus), value, timeoutMs);
  }

  async expectSortStatusEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.sortStatus), timeoutMs);
  }

  async expectSortStatusDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.sortStatus), timeoutMs);
  }

  async expectSortStatusChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.sortStatus), timeoutMs);
  }

  async expectSortStatusUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.sortStatus), timeoutMs);
  }

  async expectSortStatusFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.sortStatus), timeoutMs);
  }

  async expectSortStatusCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.sortStatus), count, timeoutMs);
  }

  async scrollSortStatusIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.sortStatus));
  }

  async longPressShowStatusColumnActions(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.showStatusColumnActions));
  }

  async expectShowStatusColumnActionsHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.showStatusColumnActions), timeoutMs);
  }

  async expectShowStatusColumnActionsText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.showStatusColumnActions), expected, timeoutMs);
  }

  async expectShowStatusColumnActionsContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.showStatusColumnActions), substring, timeoutMs);
  }

  async expectShowStatusColumnActionsValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.showStatusColumnActions), value, timeoutMs);
  }

  async expectShowStatusColumnActionsEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.showStatusColumnActions), timeoutMs);
  }

  async expectShowStatusColumnActionsDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.showStatusColumnActions), timeoutMs);
  }

  async expectShowStatusColumnActionsChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.showStatusColumnActions), timeoutMs);
  }

  async expectShowStatusColumnActionsUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.showStatusColumnActions), timeoutMs);
  }

  async expectShowStatusColumnActionsFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.showStatusColumnActions), timeoutMs);
  }

  async expectShowStatusColumnActionsCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.showStatusColumnActions), count, timeoutMs);
  }

  async scrollShowStatusColumnActionsIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.showStatusColumnActions));
  }

  async doubleClickStatusColumnWidth(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.statusColumnWidth));
  }

  async longPressStatusColumnWidth(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.statusColumnWidth));
  }

  async expectStatusColumnWidthHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.statusColumnWidth), timeoutMs);
  }

  async expectStatusColumnWidthText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.statusColumnWidth), expected, timeoutMs);
  }

  async expectStatusColumnWidthContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.statusColumnWidth), substring, timeoutMs);
  }

  async expectStatusColumnWidthValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.statusColumnWidth), value, timeoutMs);
  }

  async expectStatusColumnWidthEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.statusColumnWidth), timeoutMs);
  }

  async expectStatusColumnWidthDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.statusColumnWidth), timeoutMs);
  }

  async expectStatusColumnWidthChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.statusColumnWidth), timeoutMs);
  }

  async expectStatusColumnWidthUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.statusColumnWidth), timeoutMs);
  }

  async expectStatusColumnWidthFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.statusColumnWidth), timeoutMs);
  }

  async expectStatusColumnWidthCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.statusColumnWidth), count, timeoutMs);
  }

  async scrollStatusColumnWidthIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.statusColumnWidth));
  }

  async doubleClickSortLastModifiedBy(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.sortLastModifiedBy));
  }

  async longPressSortLastModifiedBy(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.sortLastModifiedBy));
  }

  async expectSortLastModifiedByHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.sortLastModifiedBy), timeoutMs);
  }

  async expectSortLastModifiedByText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.sortLastModifiedBy), expected, timeoutMs);
  }

  async expectSortLastModifiedByContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.sortLastModifiedBy), substring, timeoutMs);
  }

  async expectSortLastModifiedByValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.sortLastModifiedBy), value, timeoutMs);
  }

  async expectSortLastModifiedByEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.sortLastModifiedBy), timeoutMs);
  }

  async expectSortLastModifiedByDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.sortLastModifiedBy), timeoutMs);
  }

  async expectSortLastModifiedByChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.sortLastModifiedBy), timeoutMs);
  }

  async expectSortLastModifiedByUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.sortLastModifiedBy), timeoutMs);
  }

  async expectSortLastModifiedByFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.sortLastModifiedBy), timeoutMs);
  }

  async expectSortLastModifiedByCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.sortLastModifiedBy), count, timeoutMs);
  }

  async scrollSortLastModifiedByIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.sortLastModifiedBy));
  }

  async longPressShowLastModifiedBy(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.showLastModifiedBy));
  }

  async expectShowLastModifiedByHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.showLastModifiedBy), timeoutMs);
  }

  async expectShowLastModifiedByText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.showLastModifiedBy), expected, timeoutMs);
  }

  async expectShowLastModifiedByContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.showLastModifiedBy), substring, timeoutMs);
  }

  async expectShowLastModifiedByValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.showLastModifiedBy), value, timeoutMs);
  }

  async expectShowLastModifiedByEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.showLastModifiedBy), timeoutMs);
  }

  async expectShowLastModifiedByDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.showLastModifiedBy), timeoutMs);
  }

  async expectShowLastModifiedByChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.showLastModifiedBy), timeoutMs);
  }

  async expectShowLastModifiedByUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.showLastModifiedBy), timeoutMs);
  }

  async expectShowLastModifiedByFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.showLastModifiedBy), timeoutMs);
  }

  async expectShowLastModifiedByCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.showLastModifiedBy), count, timeoutMs);
  }

  async scrollShowLastModifiedByIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.showLastModifiedBy));
  }

  async doubleClickLastModifiedByAlias(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.lastModifiedByAlias));
  }

  async longPressLastModifiedByAlias(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.lastModifiedByAlias));
  }

  async expectLastModifiedByAliasHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.lastModifiedByAlias), timeoutMs);
  }

  async expectLastModifiedByAliasText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.lastModifiedByAlias), expected, timeoutMs);
  }

  async expectLastModifiedByAliasContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.lastModifiedByAlias), substring, timeoutMs);
  }

  async expectLastModifiedByAliasValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.lastModifiedByAlias), value, timeoutMs);
  }

  async expectLastModifiedByAliasEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.lastModifiedByAlias), timeoutMs);
  }

  async expectLastModifiedByAliasDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.lastModifiedByAlias), timeoutMs);
  }

  async expectLastModifiedByAliasChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.lastModifiedByAlias), timeoutMs);
  }

  async expectLastModifiedByAliasUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.lastModifiedByAlias), timeoutMs);
  }

  async expectLastModifiedByAliasFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.lastModifiedByAlias), timeoutMs);
  }

  async expectLastModifiedByAliasCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.lastModifiedByAlias), count, timeoutMs);
  }

  async scrollLastModifiedByAliasIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.lastModifiedByAlias));
  }

  async clickNoItemsToDisplay(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.noItemsToDisplay));
  }

  async doubleClickNoItemsToDisplay(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.noItemsToDisplay));
  }

  async longPressNoItemsToDisplay(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.noItemsToDisplay));
  }

  async expectNoItemsToDisplayHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.noItemsToDisplay), timeoutMs);
  }

  async expectNoItemsToDisplayText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.noItemsToDisplay), expected, timeoutMs);
  }

  async expectNoItemsToDisplayContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.noItemsToDisplay), substring, timeoutMs);
  }

  async expectNoItemsToDisplayValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.noItemsToDisplay), value, timeoutMs);
  }

  async expectNoItemsToDisplayEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.noItemsToDisplay), timeoutMs);
  }

  async expectNoItemsToDisplayDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.noItemsToDisplay), timeoutMs);
  }

  async expectNoItemsToDisplayChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.noItemsToDisplay), timeoutMs);
  }

  async expectNoItemsToDisplayUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.noItemsToDisplay), timeoutMs);
  }

  async expectNoItemsToDisplayFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.noItemsToDisplay), timeoutMs);
  }

  async expectNoItemsToDisplayCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.noItemsToDisplay), count, timeoutMs);
  }

  async scrollNoItemsToDisplayIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.noItemsToDisplay));
  }

  async clickHomeCardHeader6140(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.homeCardHeader6140));
  }

  async doubleClickHomeCardHeader6140(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.homeCardHeader6140));
  }

  async longPressHomeCardHeader6140(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.homeCardHeader6140));
  }

  async expectHomeCardHeader6140Hidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.homeCardHeader6140), timeoutMs);
  }

  async expectHomeCardHeader6140Text(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.homeCardHeader6140), expected, timeoutMs);
  }

  async expectHomeCardHeader6140ContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.homeCardHeader6140), substring, timeoutMs);
  }

  async expectHomeCardHeader6140Value(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.homeCardHeader6140), value, timeoutMs);
  }

  async expectHomeCardHeader6140Enabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.homeCardHeader6140), timeoutMs);
  }

  async expectHomeCardHeader6140Disabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.homeCardHeader6140), timeoutMs);
  }

  async expectHomeCardHeader6140Checked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.homeCardHeader6140), timeoutMs);
  }

  async expectHomeCardHeader6140Unchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.homeCardHeader6140), timeoutMs);
  }

  async expectHomeCardHeader6140Focused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.homeCardHeader6140), timeoutMs);
  }

  async expectHomeCardHeader6140Count(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.homeCardHeader6140), count, timeoutMs);
  }

  async scrollHomeCardHeader6140IntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.homeCardHeader6140));
  }

  async doubleClickNagalingaBKammar(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.nagalingaBKammar));
  }

  async longPressNagalingaBKammar(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.nagalingaBKammar));
  }

  async expectNagalingaBKammarHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.nagalingaBKammar), timeoutMs);
  }

  async expectNagalingaBKammarText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.nagalingaBKammar), expected, timeoutMs);
  }

  async expectNagalingaBKammarContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.nagalingaBKammar), substring, timeoutMs);
  }

  async expectNagalingaBKammarValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.nagalingaBKammar), value, timeoutMs);
  }

  async expectNagalingaBKammarEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.nagalingaBKammar), timeoutMs);
  }

  async expectNagalingaBKammarDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.nagalingaBKammar), timeoutMs);
  }

  async expectNagalingaBKammarChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.nagalingaBKammar), timeoutMs);
  }

  async expectNagalingaBKammarUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.nagalingaBKammar), timeoutMs);
  }

  async expectNagalingaBKammarFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.nagalingaBKammar), timeoutMs);
  }

  async expectNagalingaBKammarCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.nagalingaBKammar), count, timeoutMs);
  }

  async scrollNagalingaBKammarIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.nagalingaBKammar));
  }

  async doubleClickAshishBhasin(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.ashishBhasin));
  }

  async longPressAshishBhasin(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.ashishBhasin));
  }

  async expectAshishBhasinHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.ashishBhasin), timeoutMs);
  }

  async expectAshishBhasinText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.ashishBhasin), expected, timeoutMs);
  }

  async expectAshishBhasinContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.ashishBhasin), substring, timeoutMs);
  }

  async expectAshishBhasinValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.ashishBhasin), value, timeoutMs);
  }

  async expectAshishBhasinEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.ashishBhasin), timeoutMs);
  }

  async expectAshishBhasinDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.ashishBhasin), timeoutMs);
  }

  async expectAshishBhasinChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.ashishBhasin), timeoutMs);
  }

  async expectAshishBhasinUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.ashishBhasin), timeoutMs);
  }

  async expectAshishBhasinFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.ashishBhasin), timeoutMs);
  }

  async expectAshishBhasinCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.ashishBhasin), count, timeoutMs);
  }

  async scrollAshishBhasinIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.ashishBhasin));
  }

  async doubleClickOperatingUnit(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.operatingUnit));
  }

  async longPressOperatingUnit(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.operatingUnit));
  }

  async expectOperatingUnitHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.operatingUnit), timeoutMs);
  }

  async expectOperatingUnitText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.operatingUnit), expected, timeoutMs);
  }

  async expectOperatingUnitContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.operatingUnit), substring, timeoutMs);
  }

  async expectOperatingUnitValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.operatingUnit), value, timeoutMs);
  }

  async expectOperatingUnitEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.operatingUnit), timeoutMs);
  }

  async expectOperatingUnitDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.operatingUnit), timeoutMs);
  }

  async expectOperatingUnitChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.operatingUnit), timeoutMs);
  }

  async expectOperatingUnitUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.operatingUnit), timeoutMs);
  }

  async expectOperatingUnitFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.operatingUnit), timeoutMs);
  }

  async expectOperatingUnitCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.operatingUnit), count, timeoutMs);
  }

  async scrollOperatingUnitIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.operatingUnit));
  }

  async doubleClickKronosUsOu(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.kronosUsOu));
  }

  async longPressKronosUsOu(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.kronosUsOu));
  }

  async expectKronosUsOuHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.kronosUsOu), timeoutMs);
  }

  async expectKronosUsOuText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.kronosUsOu), expected, timeoutMs);
  }

  async expectKronosUsOuContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.kronosUsOu), substring, timeoutMs);
  }

  async expectKronosUsOuValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.kronosUsOu), value, timeoutMs);
  }

  async expectKronosUsOuEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.kronosUsOu), timeoutMs);
  }

  async expectKronosUsOuDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.kronosUsOu), timeoutMs);
  }

  async expectKronosUsOuChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.kronosUsOu), timeoutMs);
  }

  async expectKronosUsOuUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.kronosUsOu), timeoutMs);
  }

  async expectKronosUsOuFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.kronosUsOu), timeoutMs);
  }

  async expectKronosUsOuCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.kronosUsOu), count, timeoutMs);
  }

  async scrollKronosUsOuIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.kronosUsOu));
  }

  async doubleClickOrder(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.order));
  }

  async longPressOrder(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.order));
  }

  async expectOrderHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.order), timeoutMs);
  }

  async expectOrderText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.order), expected, timeoutMs);
  }

  async expectOrderContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.order), substring, timeoutMs);
  }

  async expectOrderValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.order), value, timeoutMs);
  }

  async expectOrderEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.order), timeoutMs);
  }

  async expectOrderDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.order), timeoutMs);
  }

  async expectOrderChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.order), timeoutMs);
  }

  async expectOrderUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.order), timeoutMs);
  }

  async expectOrderFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.order), timeoutMs);
  }

  async expectOrderCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.order), count, timeoutMs);
  }

  async scrollOrderIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.order));
  }

  async doubleClickParulGajbhiye(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.parulGajbhiye));
  }

  async longPressParulGajbhiye(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.parulGajbhiye));
  }

  async expectParulGajbhiyeHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.parulGajbhiye), timeoutMs);
  }

  async expectParulGajbhiyeText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.parulGajbhiye), expected, timeoutMs);
  }

  async expectParulGajbhiyeContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.parulGajbhiye), substring, timeoutMs);
  }

  async expectParulGajbhiyeValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.parulGajbhiye), value, timeoutMs);
  }

  async expectParulGajbhiyeEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.parulGajbhiye), timeoutMs);
  }

  async expectParulGajbhiyeDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.parulGajbhiye), timeoutMs);
  }

  async expectParulGajbhiyeChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.parulGajbhiye), timeoutMs);
  }

  async expectParulGajbhiyeUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.parulGajbhiye), timeoutMs);
  }

  async expectParulGajbhiyeFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.parulGajbhiye), timeoutMs);
  }

  async expectParulGajbhiyeCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.parulGajbhiye), count, timeoutMs);
  }

  async scrollParulGajbhiyeIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.parulGajbhiye));
  }

  async doubleClickViewAllRecentRecords(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.viewAllRecentRecords));
  }

  async longPressViewAllRecentRecords(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.viewAllRecentRecords));
  }

  async expectViewAllRecentRecordsHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.viewAllRecentRecords), timeoutMs);
  }

  async expectViewAllRecentRecordsText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.viewAllRecentRecords), expected, timeoutMs);
  }

  async expectViewAllRecentRecordsContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.viewAllRecentRecords), substring, timeoutMs);
  }

  async expectViewAllRecentRecordsValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.viewAllRecentRecords), value, timeoutMs);
  }

  async expectViewAllRecentRecordsEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.viewAllRecentRecords), timeoutMs);
  }

  async expectViewAllRecentRecordsDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.viewAllRecentRecords), timeoutMs);
  }

  async expectViewAllRecentRecordsChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.viewAllRecentRecords), timeoutMs);
  }

  async expectViewAllRecentRecordsUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.viewAllRecentRecords), timeoutMs);
  }

  async expectViewAllRecentRecordsFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.viewAllRecentRecords), timeoutMs);
  }

  async expectViewAllRecentRecordsCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.viewAllRecentRecords), count, timeoutMs);
  }

  async scrollViewAllRecentRecordsIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.viewAllRecentRecords));
  }

  async doubleClickPost(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.post));
  }

  async longPressPost(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.post));
  }

  async expectPostHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.post), timeoutMs);
  }

  async expectPostText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.post), expected, timeoutMs);
  }

  async expectPostContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.post), substring, timeoutMs);
  }

  async expectPostValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.post), value, timeoutMs);
  }

  async expectPostEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.post), timeoutMs);
  }

  async expectPostDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.post), timeoutMs);
  }

  async expectPostChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.post), timeoutMs);
  }

  async expectPostUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.post), timeoutMs);
  }

  async expectPostFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.post), timeoutMs);
  }

  async expectPostCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.post), count, timeoutMs);
  }

  async scrollPostIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.post));
  }

  async doubleClickPostTab(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.postTab));
  }

  async longPressPostTab(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.postTab));
  }

  async expectPostTabHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.postTab), timeoutMs);
  }

  async expectPostTabText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.postTab), expected, timeoutMs);
  }

  async expectPostTabContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.postTab), substring, timeoutMs);
  }

  async expectPostTabValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.postTab), value, timeoutMs);
  }

  async expectPostTabEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.postTab), timeoutMs);
  }

  async expectPostTabDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.postTab), timeoutMs);
  }

  async expectPostTabChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.postTab), timeoutMs);
  }

  async expectPostTabUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.postTab), timeoutMs);
  }

  async expectPostTabFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.postTab), timeoutMs);
  }

  async expectPostTabCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.postTab), count, timeoutMs);
  }

  async scrollPostTabIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.postTab));
  }

  async longPressShareAnUpdate(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.shareAnUpdate));
  }

  async expectShareAnUpdateHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.shareAnUpdate), timeoutMs);
  }

  async expectShareAnUpdateText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.shareAnUpdate), expected, timeoutMs);
  }

  async expectShareAnUpdateContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.shareAnUpdate), substring, timeoutMs);
  }

  async expectShareAnUpdateValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.shareAnUpdate), value, timeoutMs);
  }

  async expectShareAnUpdateEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.shareAnUpdate), timeoutMs);
  }

  async expectShareAnUpdateDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.shareAnUpdate), timeoutMs);
  }

  async expectShareAnUpdateChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.shareAnUpdate), timeoutMs);
  }

  async expectShareAnUpdateUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.shareAnUpdate), timeoutMs);
  }

  async expectShareAnUpdateFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.shareAnUpdate), timeoutMs);
  }

  async expectShareAnUpdateCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.shareAnUpdate), count, timeoutMs);
  }

  async scrollShareAnUpdateIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.shareAnUpdate));
  }

  async longPressShare(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.share));
  }

  async expectShareHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.share), timeoutMs);
  }

  async expectShareText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.share), expected, timeoutMs);
  }

  async expectShareContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.share), substring, timeoutMs);
  }

  async expectShareValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.share), value, timeoutMs);
  }

  async expectShareEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.share), timeoutMs);
  }

  async expectShareDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.share), timeoutMs);
  }

  async expectShareChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.share), timeoutMs);
  }

  async expectShareUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.share), timeoutMs);
  }

  async expectShareFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.share), timeoutMs);
  }

  async expectShareCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.share), count, timeoutMs);
  }

  async scrollShareIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.share));
  }

  async longPressSortBy(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.sortBy));
  }

  async expectSortByHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.sortBy), timeoutMs);
  }

  async expectSortByText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.sortBy), expected, timeoutMs);
  }

  async expectSortByContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.sortBy), substring, timeoutMs);
  }

  async expectSortByValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.sortBy), value, timeoutMs);
  }

  async expectSortByEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.sortBy), timeoutMs);
  }

  async expectSortByDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.sortBy), timeoutMs);
  }

  async expectSortByChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.sortBy), timeoutMs);
  }

  async expectSortByUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.sortBy), timeoutMs);
  }

  async expectSortByFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.sortBy), timeoutMs);
  }

  async expectSortByCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.sortBy), count, timeoutMs);
  }

  async scrollSortByIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.sortBy));
  }

  async typeTextSearchThisFeed(value: string): Promise<void> {
    await typeTextWhenVisible(webLocator(this.page, HomePage.L.searchThisFeed), value);
  }

  async expectSearchThisFeedHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.searchThisFeed), timeoutMs);
  }

  async expectSearchThisFeedText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.searchThisFeed), expected, timeoutMs);
  }

  async expectSearchThisFeedContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.searchThisFeed), substring, timeoutMs);
  }

  async expectSearchThisFeedValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.searchThisFeed), value, timeoutMs);
  }

  async expectSearchThisFeedEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.searchThisFeed), timeoutMs);
  }

  async expectSearchThisFeedDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.searchThisFeed), timeoutMs);
  }

  async expectSearchThisFeedChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.searchThisFeed), timeoutMs);
  }

  async expectSearchThisFeedUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.searchThisFeed), timeoutMs);
  }

  async expectSearchThisFeedFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.searchThisFeed), timeoutMs);
  }

  async expectSearchThisFeedCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.searchThisFeed), count, timeoutMs);
  }

  async scrollSearchThisFeedIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.searchThisFeed));
  }

  async longPressFilterFeed(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.filterFeed));
  }

  async expectFilterFeedHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.filterFeed), timeoutMs);
  }

  async expectFilterFeedText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.filterFeed), expected, timeoutMs);
  }

  async expectFilterFeedContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.filterFeed), substring, timeoutMs);
  }

  async expectFilterFeedValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.filterFeed), value, timeoutMs);
  }

  async expectFilterFeedEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.filterFeed), timeoutMs);
  }

  async expectFilterFeedDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.filterFeed), timeoutMs);
  }

  async expectFilterFeedChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.filterFeed), timeoutMs);
  }

  async expectFilterFeedUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.filterFeed), timeoutMs);
  }

  async expectFilterFeedFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.filterFeed), timeoutMs);
  }

  async expectFilterFeedCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.filterFeed), count, timeoutMs);
  }

  async scrollFilterFeedIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.filterFeed));
  }

  async longPressRefreshThisFeed(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.refreshThisFeed));
  }

  async expectRefreshThisFeedHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.refreshThisFeed), timeoutMs);
  }

  async expectRefreshThisFeedText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.refreshThisFeed), expected, timeoutMs);
  }

  async expectRefreshThisFeedContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.refreshThisFeed), substring, timeoutMs);
  }

  async expectRefreshThisFeedValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.refreshThisFeed), value, timeoutMs);
  }

  async expectRefreshThisFeedEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.refreshThisFeed), timeoutMs);
  }

  async expectRefreshThisFeedDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.refreshThisFeed), timeoutMs);
  }

  async expectRefreshThisFeedChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.refreshThisFeed), timeoutMs);
  }

  async expectRefreshThisFeedUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.refreshThisFeed), timeoutMs);
  }

  async expectRefreshThisFeedFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.refreshThisFeed), timeoutMs);
  }

  async expectRefreshThisFeedCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.refreshThisFeed), count, timeoutMs);
  }

  async scrollRefreshThisFeedIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.refreshThisFeed));
  }

  async doubleClickSkipFeed(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.skipFeed));
  }

  async longPressSkipFeed(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.skipFeed));
  }

  async expectSkipFeedHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.skipFeed), timeoutMs);
  }

  async expectSkipFeedText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.skipFeed), expected, timeoutMs);
  }

  async expectSkipFeedContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.skipFeed), substring, timeoutMs);
  }

  async expectSkipFeedValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.skipFeed), value, timeoutMs);
  }

  async expectSkipFeedEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.skipFeed), timeoutMs);
  }

  async expectSkipFeedDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.skipFeed), timeoutMs);
  }

  async expectSkipFeedChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.skipFeed), timeoutMs);
  }

  async expectSkipFeedUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.skipFeed), timeoutMs);
  }

  async expectSkipFeedFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.skipFeed), timeoutMs);
  }

  async expectSkipFeedCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.skipFeed), count, timeoutMs);
  }

  async scrollSkipFeedIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.skipFeed));
  }

  async doubleClickShaneAndersonLikeCommentShare(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.shaneAndersonLikeCommentShare));
  }

  async longPressShaneAndersonLikeCommentShare(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.shaneAndersonLikeCommentShare));
  }

  async expectShaneAndersonLikeCommentShareHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.shaneAndersonLikeCommentShare), timeoutMs);
  }

  async expectShaneAndersonLikeCommentShareText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.shaneAndersonLikeCommentShare), expected, timeoutMs);
  }

  async expectShaneAndersonLikeCommentShareContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.shaneAndersonLikeCommentShare), substring, timeoutMs);
  }

  async expectShaneAndersonLikeCommentShareValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.shaneAndersonLikeCommentShare), value, timeoutMs);
  }

  async expectShaneAndersonLikeCommentShareEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.shaneAndersonLikeCommentShare), timeoutMs);
  }

  async expectShaneAndersonLikeCommentShareDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.shaneAndersonLikeCommentShare), timeoutMs);
  }

  async expectShaneAndersonLikeCommentShareChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.shaneAndersonLikeCommentShare), timeoutMs);
  }

  async expectShaneAndersonLikeCommentShareUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.shaneAndersonLikeCommentShare), timeoutMs);
  }

  async expectShaneAndersonLikeCommentShareFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.shaneAndersonLikeCommentShare), timeoutMs);
  }

  async expectShaneAndersonLikeCommentShareCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.shaneAndersonLikeCommentShare), count, timeoutMs);
  }

  async scrollShaneAndersonLikeCommentShareIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.shaneAndersonLikeCommentShare));
  }

  async longPressActionsForThisFeedLikeCommentShare(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.actionsForThisFeedLikeCommentShare));
  }

  async expectActionsForThisFeedLikeCommentShareHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.actionsForThisFeedLikeCommentShare), timeoutMs);
  }

  async expectActionsForThisFeedLikeCommentShareText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.actionsForThisFeedLikeCommentShare), expected, timeoutMs);
  }

  async expectActionsForThisFeedLikeCommentShareContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.actionsForThisFeedLikeCommentShare), substring, timeoutMs);
  }

  async expectActionsForThisFeedLikeCommentShareValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.actionsForThisFeedLikeCommentShare), value, timeoutMs);
  }

  async expectActionsForThisFeedLikeCommentShareEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.actionsForThisFeedLikeCommentShare), timeoutMs);
  }

  async expectActionsForThisFeedLikeCommentShareDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.actionsForThisFeedLikeCommentShare), timeoutMs);
  }

  async expectActionsForThisFeedLikeCommentShareChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.actionsForThisFeedLikeCommentShare), timeoutMs);
  }

  async expectActionsForThisFeedLikeCommentShareUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.actionsForThisFeedLikeCommentShare), timeoutMs);
  }

  async expectActionsForThisFeedLikeCommentShareFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.actionsForThisFeedLikeCommentShare), timeoutMs);
  }

  async expectActionsForThisFeedLikeCommentShareCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.actionsForThisFeedLikeCommentShare), count, timeoutMs);
  }

  async scrollActionsForThisFeedLikeCommentShareIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.actionsForThisFeedLikeCommentShare));
  }

  async clickHiAllFromPrint(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.hiAllFromPrint));
  }

  async doubleClickHiAllFromPrint(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.hiAllFromPrint));
  }

  async longPressHiAllFromPrint(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.hiAllFromPrint));
  }

  async expectHiAllFromPrintHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.hiAllFromPrint), timeoutMs);
  }

  async expectHiAllFromPrintText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.hiAllFromPrint), expected, timeoutMs);
  }

  async expectHiAllFromPrintContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.hiAllFromPrint), substring, timeoutMs);
  }

  async expectHiAllFromPrintValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.hiAllFromPrint), value, timeoutMs);
  }

  async expectHiAllFromPrintEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.hiAllFromPrint), timeoutMs);
  }

  async expectHiAllFromPrintDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.hiAllFromPrint), timeoutMs);
  }

  async expectHiAllFromPrintChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.hiAllFromPrint), timeoutMs);
  }

  async expectHiAllFromPrintUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.hiAllFromPrint), timeoutMs);
  }

  async expectHiAllFromPrintFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.hiAllFromPrint), timeoutMs);
  }

  async expectHiAllFromPrintCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.hiAllFromPrint), count, timeoutMs);
  }

  async scrollHiAllFromPrintIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.hiAllFromPrint));
  }

  async clickFedExHasPostedThe(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.fedExHasPostedThe));
  }

  async doubleClickFedExHasPostedThe(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.fedExHasPostedThe));
  }

  async longPressFedExHasPostedThe(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.fedExHasPostedThe));
  }

  async expectFedExHasPostedTheHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.fedExHasPostedThe), timeoutMs);
  }

  async expectFedExHasPostedTheText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.fedExHasPostedThe), expected, timeoutMs);
  }

  async expectFedExHasPostedTheContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.fedExHasPostedThe), substring, timeoutMs);
  }

  async expectFedExHasPostedTheValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.fedExHasPostedThe), value, timeoutMs);
  }

  async expectFedExHasPostedTheEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.fedExHasPostedThe), timeoutMs);
  }

  async expectFedExHasPostedTheDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.fedExHasPostedThe), timeoutMs);
  }

  async expectFedExHasPostedTheChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.fedExHasPostedThe), timeoutMs);
  }

  async expectFedExHasPostedTheUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.fedExHasPostedThe), timeoutMs);
  }

  async expectFedExHasPostedTheFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.fedExHasPostedThe), timeoutMs);
  }

  async expectFedExHasPostedTheCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.fedExHasPostedThe), count, timeoutMs);
  }

  async scrollFedExHasPostedTheIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.fedExHasPostedThe));
  }

  async doubleClickHttpsWwwFedexComEnUsServiceAlertsHtmlLikeCommentShare(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.httpsWwwFedexComEnUsServiceAlertsHtmlLikeCommentShare));
  }

  async longPressHttpsWwwFedexComEnUsServiceAlertsHtmlLikeCommentShare(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.httpsWwwFedexComEnUsServiceAlertsHtmlLikeCommentShare));
  }

  async expectHttpsWwwFedexComEnUsServiceAlertsHtmlLikeCommentShareHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.httpsWwwFedexComEnUsServiceAlertsHtmlLikeCommentShare), timeoutMs);
  }

  async expectHttpsWwwFedexComEnUsServiceAlertsHtmlLikeCommentShareText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.httpsWwwFedexComEnUsServiceAlertsHtmlLikeCommentShare), expected, timeoutMs);
  }

  async expectHttpsWwwFedexComEnUsServiceAlertsHtmlLikeCommentShareContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.httpsWwwFedexComEnUsServiceAlertsHtmlLikeCommentShare), substring, timeoutMs);
  }

  async expectHttpsWwwFedexComEnUsServiceAlertsHtmlLikeCommentShareValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.httpsWwwFedexComEnUsServiceAlertsHtmlLikeCommentShare), value, timeoutMs);
  }

  async expectHttpsWwwFedexComEnUsServiceAlertsHtmlLikeCommentShareEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.httpsWwwFedexComEnUsServiceAlertsHtmlLikeCommentShare), timeoutMs);
  }

  async expectHttpsWwwFedexComEnUsServiceAlertsHtmlLikeCommentShareDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.httpsWwwFedexComEnUsServiceAlertsHtmlLikeCommentShare), timeoutMs);
  }

  async expectHttpsWwwFedexComEnUsServiceAlertsHtmlLikeCommentShareChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.httpsWwwFedexComEnUsServiceAlertsHtmlLikeCommentShare), timeoutMs);
  }

  async expectHttpsWwwFedexComEnUsServiceAlertsHtmlLikeCommentShareUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.httpsWwwFedexComEnUsServiceAlertsHtmlLikeCommentShare), timeoutMs);
  }

  async expectHttpsWwwFedexComEnUsServiceAlertsHtmlLikeCommentShareFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.httpsWwwFedexComEnUsServiceAlertsHtmlLikeCommentShare), timeoutMs);
  }

  async expectHttpsWwwFedexComEnUsServiceAlertsHtmlLikeCommentShareCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.httpsWwwFedexComEnUsServiceAlertsHtmlLikeCommentShare), count, timeoutMs);
  }

  async scrollHttpsWwwFedexComEnUsServiceAlertsHtmlLikeCommentShareIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.httpsWwwFedexComEnUsServiceAlertsHtmlLikeCommentShare));
  }

  async clickWinterStormAdvisory(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.winterStormAdvisory));
  }

  async doubleClickWinterStormAdvisory(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.winterStormAdvisory));
  }

  async longPressWinterStormAdvisory(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.winterStormAdvisory));
  }

  async expectWinterStormAdvisoryHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.winterStormAdvisory), timeoutMs);
  }

  async expectWinterStormAdvisoryText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.winterStormAdvisory), expected, timeoutMs);
  }

  async expectWinterStormAdvisoryContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.winterStormAdvisory), substring, timeoutMs);
  }

  async expectWinterStormAdvisoryValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.winterStormAdvisory), value, timeoutMs);
  }

  async expectWinterStormAdvisoryEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.winterStormAdvisory), timeoutMs);
  }

  async expectWinterStormAdvisoryDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.winterStormAdvisory), timeoutMs);
  }

  async expectWinterStormAdvisoryChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.winterStormAdvisory), timeoutMs);
  }

  async expectWinterStormAdvisoryUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.winterStormAdvisory), timeoutMs);
  }

  async expectWinterStormAdvisoryFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.winterStormAdvisory), timeoutMs);
  }

  async expectWinterStormAdvisoryCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.winterStormAdvisory), count, timeoutMs);
  }

  async scrollWinterStormAdvisoryIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.winterStormAdvisory));
  }

  async clickForSpecificShipmentStatusLikeCommentShare(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.forSpecificShipmentStatusLikeCommentShare));
  }

  async doubleClickForSpecificShipmentStatusLikeCommentShare(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.forSpecificShipmentStatusLikeCommentShare));
  }

  async longPressForSpecificShipmentStatusLikeCommentShare(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.forSpecificShipmentStatusLikeCommentShare));
  }

  async expectForSpecificShipmentStatusLikeCommentShareHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.forSpecificShipmentStatusLikeCommentShare), timeoutMs);
  }

  async expectForSpecificShipmentStatusLikeCommentShareText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.forSpecificShipmentStatusLikeCommentShare), expected, timeoutMs);
  }

  async expectForSpecificShipmentStatusLikeCommentShareContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.forSpecificShipmentStatusLikeCommentShare), substring, timeoutMs);
  }

  async expectForSpecificShipmentStatusLikeCommentShareValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.forSpecificShipmentStatusLikeCommentShare), value, timeoutMs);
  }

  async expectForSpecificShipmentStatusLikeCommentShareEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.forSpecificShipmentStatusLikeCommentShare), timeoutMs);
  }

  async expectForSpecificShipmentStatusLikeCommentShareDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.forSpecificShipmentStatusLikeCommentShare), timeoutMs);
  }

  async expectForSpecificShipmentStatusLikeCommentShareChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.forSpecificShipmentStatusLikeCommentShare), timeoutMs);
  }

  async expectForSpecificShipmentStatusLikeCommentShareUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.forSpecificShipmentStatusLikeCommentShare), timeoutMs);
  }

  async expectForSpecificShipmentStatusLikeCommentShareFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.forSpecificShipmentStatusLikeCommentShare), timeoutMs);
  }

  async expectForSpecificShipmentStatusLikeCommentShareCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.forSpecificShipmentStatusLikeCommentShare), count, timeoutMs);
  }

  async scrollForSpecificShipmentStatusLikeCommentShareIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.forSpecificShipmentStatusLikeCommentShare));
  }

  async doubleClickHttpsWwwFedexComEnUsTrackingCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.httpsWwwFedexComEnUsTrackingCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326));
  }

  async longPressHttpsWwwFedexComEnUsTrackingCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.httpsWwwFedexComEnUsTrackingCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326));
  }

  async expectHttpsWwwFedexComEnUsTrackingCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326Hidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.httpsWwwFedexComEnUsTrackingCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326), timeoutMs);
  }

  async expectHttpsWwwFedexComEnUsTrackingCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326Text(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.httpsWwwFedexComEnUsTrackingCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326), expected, timeoutMs);
  }

  async expectHttpsWwwFedexComEnUsTrackingCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326ContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.httpsWwwFedexComEnUsTrackingCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326), substring, timeoutMs);
  }

  async expectHttpsWwwFedexComEnUsTrackingCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326Value(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.httpsWwwFedexComEnUsTrackingCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326), value, timeoutMs);
  }

  async expectHttpsWwwFedexComEnUsTrackingCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326Enabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.httpsWwwFedexComEnUsTrackingCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326), timeoutMs);
  }

  async expectHttpsWwwFedexComEnUsTrackingCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326Disabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.httpsWwwFedexComEnUsTrackingCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326), timeoutMs);
  }

  async expectHttpsWwwFedexComEnUsTrackingCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326Checked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.httpsWwwFedexComEnUsTrackingCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326), timeoutMs);
  }

  async expectHttpsWwwFedexComEnUsTrackingCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326Unchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.httpsWwwFedexComEnUsTrackingCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326), timeoutMs);
  }

  async expectHttpsWwwFedexComEnUsTrackingCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326Focused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.httpsWwwFedexComEnUsTrackingCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326), timeoutMs);
  }

  async expectHttpsWwwFedexComEnUsTrackingCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326Count(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.httpsWwwFedexComEnUsTrackingCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326), count, timeoutMs);
  }

  async scrollHttpsWwwFedexComEnUsTrackingCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326IntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.httpsWwwFedexComEnUsTrackingCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326));
  }

  async clickYourShipmentAt(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.yourShipmentAt));
  }

  async doubleClickYourShipmentAt(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.yourShipmentAt));
  }

  async longPressYourShipmentAt(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.yourShipmentAt));
  }

  async expectYourShipmentAtHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.yourShipmentAt), timeoutMs);
  }

  async expectYourShipmentAtText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.yourShipmentAt), expected, timeoutMs);
  }

  async expectYourShipmentAtContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.yourShipmentAt), substring, timeoutMs);
  }

  async expectYourShipmentAtValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.yourShipmentAt), value, timeoutMs);
  }

  async expectYourShipmentAtEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.yourShipmentAt), timeoutMs);
  }

  async expectYourShipmentAtDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.yourShipmentAt), timeoutMs);
  }

  async expectYourShipmentAtChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.yourShipmentAt), timeoutMs);
  }

  async expectYourShipmentAtUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.yourShipmentAt), timeoutMs);
  }

  async expectYourShipmentAtFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.yourShipmentAt), timeoutMs);
  }

  async expectYourShipmentAtCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.yourShipmentAt), count, timeoutMs);
  }

  async scrollYourShipmentAtIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.yourShipmentAt));
  }

  async doubleClickFedexCom(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.fedexCom));
  }

  async longPressFedexCom(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.fedexCom));
  }

  async expectFedexComHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.fedexCom), timeoutMs);
  }

  async expectFedexComText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.fedexCom), expected, timeoutMs);
  }

  async expectFedexComContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.fedexCom), substring, timeoutMs);
  }

  async expectFedexComValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.fedexCom), value, timeoutMs);
  }

  async expectFedexComEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.fedexCom), timeoutMs);
  }

  async expectFedexComDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.fedexCom), timeoutMs);
  }

  async expectFedexComChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.fedexCom), timeoutMs);
  }

  async expectFedexComUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.fedexCom), timeoutMs);
  }

  async expectFedexComFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.fedexCom), timeoutMs);
  }

  async expectFedexComCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.fedexCom), count, timeoutMs);
  }

  async scrollFedexComIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.fedexCom));
  }

  async clickResidentialRecipientsCan(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.residentialRecipientsCan));
  }

  async doubleClickResidentialRecipientsCan(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.residentialRecipientsCan));
  }

  async longPressResidentialRecipientsCan(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.residentialRecipientsCan));
  }

  async expectResidentialRecipientsCanHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.residentialRecipientsCan), timeoutMs);
  }

  async expectResidentialRecipientsCanText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.residentialRecipientsCan), expected, timeoutMs);
  }

  async expectResidentialRecipientsCanContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.residentialRecipientsCan), substring, timeoutMs);
  }

  async expectResidentialRecipientsCanValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.residentialRecipientsCan), value, timeoutMs);
  }

  async expectResidentialRecipientsCanEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.residentialRecipientsCan), timeoutMs);
  }

  async expectResidentialRecipientsCanDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.residentialRecipientsCan), timeoutMs);
  }

  async expectResidentialRecipientsCanChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.residentialRecipientsCan), timeoutMs);
  }

  async expectResidentialRecipientsCanUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.residentialRecipientsCan), timeoutMs);
  }

  async expectResidentialRecipientsCanFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.residentialRecipientsCan), timeoutMs);
  }

  async expectResidentialRecipientsCanCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.residentialRecipientsCan), count, timeoutMs);
  }

  async scrollResidentialRecipientsCanIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.residentialRecipientsCan));
  }

  async doubleClickHttpsWwwFedexComEnUsDeliveryManagerHtmlCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.httpsWwwFedexComEnUsDeliveryManagerHtmlCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326));
  }

  async longPressHttpsWwwFedexComEnUsDeliveryManagerHtmlCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.httpsWwwFedexComEnUsDeliveryManagerHtmlCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326));
  }

  async expectHttpsWwwFedexComEnUsDeliveryManagerHtmlCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326Hidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.httpsWwwFedexComEnUsDeliveryManagerHtmlCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326), timeoutMs);
  }

  async expectHttpsWwwFedexComEnUsDeliveryManagerHtmlCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326Text(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.httpsWwwFedexComEnUsDeliveryManagerHtmlCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326), expected, timeoutMs);
  }

  async expectHttpsWwwFedexComEnUsDeliveryManagerHtmlCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326ContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.httpsWwwFedexComEnUsDeliveryManagerHtmlCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326), substring, timeoutMs);
  }

  async expectHttpsWwwFedexComEnUsDeliveryManagerHtmlCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326Value(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.httpsWwwFedexComEnUsDeliveryManagerHtmlCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326), value, timeoutMs);
  }

  async expectHttpsWwwFedexComEnUsDeliveryManagerHtmlCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326Enabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.httpsWwwFedexComEnUsDeliveryManagerHtmlCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326), timeoutMs);
  }

  async expectHttpsWwwFedexComEnUsDeliveryManagerHtmlCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326Disabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.httpsWwwFedexComEnUsDeliveryManagerHtmlCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326), timeoutMs);
  }

  async expectHttpsWwwFedexComEnUsDeliveryManagerHtmlCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326Checked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.httpsWwwFedexComEnUsDeliveryManagerHtmlCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326), timeoutMs);
  }

  async expectHttpsWwwFedexComEnUsDeliveryManagerHtmlCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326Unchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.httpsWwwFedexComEnUsDeliveryManagerHtmlCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326), timeoutMs);
  }

  async expectHttpsWwwFedexComEnUsDeliveryManagerHtmlCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326Focused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.httpsWwwFedexComEnUsDeliveryManagerHtmlCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326), timeoutMs);
  }

  async expectHttpsWwwFedexComEnUsDeliveryManagerHtmlCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326Count(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.httpsWwwFedexComEnUsDeliveryManagerHtmlCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326), count, timeoutMs);
  }

  async scrollHttpsWwwFedexComEnUsDeliveryManagerHtmlCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326IntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.httpsWwwFedexComEnUsDeliveryManagerHtmlCmpEmc1003145112001111110GlblUsEnSRDISRUPT012326));
  }

  async clickToStayInformedOf(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.toStayInformedOf));
  }

  async doubleClickToStayInformedOf(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.toStayInformedOf));
  }

  async longPressToStayInformedOf(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.toStayInformedOf));
  }

  async expectToStayInformedOfHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.toStayInformedOf), timeoutMs);
  }

  async expectToStayInformedOfText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.toStayInformedOf), expected, timeoutMs);
  }

  async expectToStayInformedOfContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.toStayInformedOf), substring, timeoutMs);
  }

  async expectToStayInformedOfValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.toStayInformedOf), value, timeoutMs);
  }

  async expectToStayInformedOfEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.toStayInformedOf), timeoutMs);
  }

  async expectToStayInformedOfDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.toStayInformedOf), timeoutMs);
  }

  async expectToStayInformedOfChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.toStayInformedOf), timeoutMs);
  }

  async expectToStayInformedOfUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.toStayInformedOf), timeoutMs);
  }

  async expectToStayInformedOfFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.toStayInformedOf), timeoutMs);
  }

  async expectToStayInformedOfCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.toStayInformedOf), count, timeoutMs);
  }

  async scrollToStayInformedOfIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.toStayInformedOf));
  }

  async clickThankYouExceptionalCustomer(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.thankYouExceptionalCustomer));
  }

  async doubleClickThankYouExceptionalCustomer(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.thankYouExceptionalCustomer));
  }

  async longPressThankYouExceptionalCustomer(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.thankYouExceptionalCustomer));
  }

  async expectThankYouExceptionalCustomerHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.thankYouExceptionalCustomer), timeoutMs);
  }

  async expectThankYouExceptionalCustomerText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.thankYouExceptionalCustomer), expected, timeoutMs);
  }

  async expectThankYouExceptionalCustomerContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.thankYouExceptionalCustomer), substring, timeoutMs);
  }

  async expectThankYouExceptionalCustomerValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.thankYouExceptionalCustomer), value, timeoutMs);
  }

  async expectThankYouExceptionalCustomerEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.thankYouExceptionalCustomer), timeoutMs);
  }

  async expectThankYouExceptionalCustomerDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.thankYouExceptionalCustomer), timeoutMs);
  }

  async expectThankYouExceptionalCustomerChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.thankYouExceptionalCustomer), timeoutMs);
  }

  async expectThankYouExceptionalCustomerUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.thankYouExceptionalCustomer), timeoutMs);
  }

  async expectThankYouExceptionalCustomerFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.thankYouExceptionalCustomer), timeoutMs);
  }

  async expectThankYouExceptionalCustomerCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.thankYouExceptionalCustomer), count, timeoutMs);
  }

  async scrollThankYouExceptionalCustomerIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.thankYouExceptionalCustomer));
  }

  async clickThankYouLikeCommentShare(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.thankYouLikeCommentShare));
  }

  async doubleClickThankYouLikeCommentShare(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.thankYouLikeCommentShare));
  }

  async longPressThankYouLikeCommentShare(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.thankYouLikeCommentShare));
  }

  async expectThankYouLikeCommentShareHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.thankYouLikeCommentShare), timeoutMs);
  }

  async expectThankYouLikeCommentShareText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.thankYouLikeCommentShare), expected, timeoutMs);
  }

  async expectThankYouLikeCommentShareContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.thankYouLikeCommentShare), substring, timeoutMs);
  }

  async expectThankYouLikeCommentShareValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.thankYouLikeCommentShare), value, timeoutMs);
  }

  async expectThankYouLikeCommentShareEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.thankYouLikeCommentShare), timeoutMs);
  }

  async expectThankYouLikeCommentShareDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.thankYouLikeCommentShare), timeoutMs);
  }

  async expectThankYouLikeCommentShareChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.thankYouLikeCommentShare), timeoutMs);
  }

  async expectThankYouLikeCommentShareUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.thankYouLikeCommentShare), timeoutMs);
  }

  async expectThankYouLikeCommentShareFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.thankYouLikeCommentShare), timeoutMs);
  }

  async expectThankYouLikeCommentShareCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.thankYouLikeCommentShare), count, timeoutMs);
  }

  async scrollThankYouLikeCommentShareIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.thankYouLikeCommentShare));
  }

  async doubleClickExceptionalCustomerExperienceCxLikeCommentShare(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCxLikeCommentShare));
  }

  async longPressExceptionalCustomerExperienceCxLikeCommentShare(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCxLikeCommentShare));
  }

  async expectExceptionalCustomerExperienceCxLikeCommentShareHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCxLikeCommentShare), timeoutMs);
  }

  async expectExceptionalCustomerExperienceCxLikeCommentShareText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCxLikeCommentShare), expected, timeoutMs);
  }

  async expectExceptionalCustomerExperienceCxLikeCommentShareContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCxLikeCommentShare), substring, timeoutMs);
  }

  async expectExceptionalCustomerExperienceCxLikeCommentShareValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCxLikeCommentShare), value, timeoutMs);
  }

  async expectExceptionalCustomerExperienceCxLikeCommentShareEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCxLikeCommentShare), timeoutMs);
  }

  async expectExceptionalCustomerExperienceCxLikeCommentShareDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCxLikeCommentShare), timeoutMs);
  }

  async expectExceptionalCustomerExperienceCxLikeCommentShareChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCxLikeCommentShare), timeoutMs);
  }

  async expectExceptionalCustomerExperienceCxLikeCommentShareUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCxLikeCommentShare), timeoutMs);
  }

  async expectExceptionalCustomerExperienceCxLikeCommentShareFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCxLikeCommentShare), timeoutMs);
  }

  async expectExceptionalCustomerExperienceCxLikeCommentShareCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCxLikeCommentShare), count, timeoutMs);
  }

  async scrollExceptionalCustomerExperienceCxLikeCommentShareIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCxLikeCommentShare));
  }

  async doubleClickCCManagedServices(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.cCManagedServices));
  }

  async longPressCCManagedServices(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.cCManagedServices));
  }

  async expectCCManagedServicesHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.cCManagedServices), timeoutMs);
  }

  async expectCCManagedServicesText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.cCManagedServices), expected, timeoutMs);
  }

  async expectCCManagedServicesContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.cCManagedServices), substring, timeoutMs);
  }

  async expectCCManagedServicesValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.cCManagedServices), value, timeoutMs);
  }

  async expectCCManagedServicesEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.cCManagedServices), timeoutMs);
  }

  async expectCCManagedServicesDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.cCManagedServices), timeoutMs);
  }

  async expectCCManagedServicesChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.cCManagedServices), timeoutMs);
  }

  async expectCCManagedServicesUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.cCManagedServices), timeoutMs);
  }

  async expectCCManagedServicesFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.cCManagedServices), timeoutMs);
  }

  async expectCCManagedServicesCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.cCManagedServices), count, timeoutMs);
  }

  async scrollCCManagedServicesIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.cCManagedServices));
  }

  async doubleClickShowMoreTextLikeCommentShare(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.showMoreTextLikeCommentShare));
  }

  async longPressShowMoreTextLikeCommentShare(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.showMoreTextLikeCommentShare));
  }

  async expectShowMoreTextLikeCommentShareHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.showMoreTextLikeCommentShare), timeoutMs);
  }

  async expectShowMoreTextLikeCommentShareText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.showMoreTextLikeCommentShare), expected, timeoutMs);
  }

  async expectShowMoreTextLikeCommentShareContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.showMoreTextLikeCommentShare), substring, timeoutMs);
  }

  async expectShowMoreTextLikeCommentShareValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.showMoreTextLikeCommentShare), value, timeoutMs);
  }

  async expectShowMoreTextLikeCommentShareEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.showMoreTextLikeCommentShare), timeoutMs);
  }

  async expectShowMoreTextLikeCommentShareDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.showMoreTextLikeCommentShare), timeoutMs);
  }

  async expectShowMoreTextLikeCommentShareChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.showMoreTextLikeCommentShare), timeoutMs);
  }

  async expectShowMoreTextLikeCommentShareUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.showMoreTextLikeCommentShare), timeoutMs);
  }

  async expectShowMoreTextLikeCommentShareFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.showMoreTextLikeCommentShare), timeoutMs);
  }

  async expectShowMoreTextLikeCommentShareCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.showMoreTextLikeCommentShare), count, timeoutMs);
  }

  async scrollShowMoreTextLikeCommentShareIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.showMoreTextLikeCommentShare));
  }

  async doubleClickWwwFedexComLikeCommentShare(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.wwwFedexComLikeCommentShare));
  }

  async longPressWwwFedexComLikeCommentShare(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.wwwFedexComLikeCommentShare));
  }

  async expectWwwFedexComLikeCommentShareHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.wwwFedexComLikeCommentShare), timeoutMs);
  }

  async expectWwwFedexComLikeCommentShareText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.wwwFedexComLikeCommentShare), expected, timeoutMs);
  }

  async expectWwwFedexComLikeCommentShareContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.wwwFedexComLikeCommentShare), substring, timeoutMs);
  }

  async expectWwwFedexComLikeCommentShareValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.wwwFedexComLikeCommentShare), value, timeoutMs);
  }

  async expectWwwFedexComLikeCommentShareEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.wwwFedexComLikeCommentShare), timeoutMs);
  }

  async expectWwwFedexComLikeCommentShareDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.wwwFedexComLikeCommentShare), timeoutMs);
  }

  async expectWwwFedexComLikeCommentShareChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.wwwFedexComLikeCommentShare), timeoutMs);
  }

  async expectWwwFedexComLikeCommentShareUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.wwwFedexComLikeCommentShare), timeoutMs);
  }

  async expectWwwFedexComLikeCommentShareFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.wwwFedexComLikeCommentShare), timeoutMs);
  }

  async expectWwwFedexComLikeCommentShareCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.wwwFedexComLikeCommentShare), count, timeoutMs);
  }

  async scrollWwwFedexComLikeCommentShareIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.wwwFedexComLikeCommentShare));
  }

  async doubleClickLikeLikeCommentShare(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.likeLikeCommentShare));
  }

  async longPressLikeLikeCommentShare(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.likeLikeCommentShare));
  }

  async expectLikeLikeCommentShareHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.likeLikeCommentShare), timeoutMs);
  }

  async expectLikeLikeCommentShareText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.likeLikeCommentShare), expected, timeoutMs);
  }

  async expectLikeLikeCommentShareContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.likeLikeCommentShare), substring, timeoutMs);
  }

  async expectLikeLikeCommentShareValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.likeLikeCommentShare), value, timeoutMs);
  }

  async expectLikeLikeCommentShareEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.likeLikeCommentShare), timeoutMs);
  }

  async expectLikeLikeCommentShareDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.likeLikeCommentShare), timeoutMs);
  }

  async expectLikeLikeCommentShareChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.likeLikeCommentShare), timeoutMs);
  }

  async expectLikeLikeCommentShareUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.likeLikeCommentShare), timeoutMs);
  }

  async expectLikeLikeCommentShareFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.likeLikeCommentShare), timeoutMs);
  }

  async expectLikeLikeCommentShareCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.likeLikeCommentShare), count, timeoutMs);
  }

  async scrollLikeLikeCommentShareIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.likeLikeCommentShare));
  }

  async doubleClickCommentLikeCommentShare(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.commentLikeCommentShare));
  }

  async longPressCommentLikeCommentShare(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.commentLikeCommentShare));
  }

  async expectCommentLikeCommentShareHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.commentLikeCommentShare), timeoutMs);
  }

  async expectCommentLikeCommentShareText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.commentLikeCommentShare), expected, timeoutMs);
  }

  async expectCommentLikeCommentShareContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.commentLikeCommentShare), substring, timeoutMs);
  }

  async expectCommentLikeCommentShareValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.commentLikeCommentShare), value, timeoutMs);
  }

  async expectCommentLikeCommentShareEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.commentLikeCommentShare), timeoutMs);
  }

  async expectCommentLikeCommentShareDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.commentLikeCommentShare), timeoutMs);
  }

  async expectCommentLikeCommentShareChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.commentLikeCommentShare), timeoutMs);
  }

  async expectCommentLikeCommentShareUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.commentLikeCommentShare), timeoutMs);
  }

  async expectCommentLikeCommentShareFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.commentLikeCommentShare), timeoutMs);
  }

  async expectCommentLikeCommentShareCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.commentLikeCommentShare), count, timeoutMs);
  }

  async scrollCommentLikeCommentShareIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.commentLikeCommentShare));
  }

  async doubleClickSeenBy149LikeCommentShare(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.seenBy149LikeCommentShare));
  }

  async longPressSeenBy149LikeCommentShare(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.seenBy149LikeCommentShare));
  }

  async expectSeenBy149LikeCommentShareHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.seenBy149LikeCommentShare), timeoutMs);
  }

  async expectSeenBy149LikeCommentShareText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.seenBy149LikeCommentShare), expected, timeoutMs);
  }

  async expectSeenBy149LikeCommentShareContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.seenBy149LikeCommentShare), substring, timeoutMs);
  }

  async expectSeenBy149LikeCommentShareValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.seenBy149LikeCommentShare), value, timeoutMs);
  }

  async expectSeenBy149LikeCommentShareEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.seenBy149LikeCommentShare), timeoutMs);
  }

  async expectSeenBy149LikeCommentShareDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.seenBy149LikeCommentShare), timeoutMs);
  }

  async expectSeenBy149LikeCommentShareChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.seenBy149LikeCommentShare), timeoutMs);
  }

  async expectSeenBy149LikeCommentShareUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.seenBy149LikeCommentShare), timeoutMs);
  }

  async expectSeenBy149LikeCommentShareFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.seenBy149LikeCommentShare), timeoutMs);
  }

  async expectSeenBy149LikeCommentShareCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.seenBy149LikeCommentShare), count, timeoutMs);
  }

  async scrollSeenBy149LikeCommentShareIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.seenBy149LikeCommentShare));
  }

  async clickLikesThisLikeCommentShare(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.likesThisLikeCommentShare));
  }

  async doubleClickLikesThisLikeCommentShare(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.likesThisLikeCommentShare));
  }

  async longPressLikesThisLikeCommentShare(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.likesThisLikeCommentShare));
  }

  async expectLikesThisLikeCommentShareHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.likesThisLikeCommentShare), timeoutMs);
  }

  async expectLikesThisLikeCommentShareText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.likesThisLikeCommentShare), expected, timeoutMs);
  }

  async expectLikesThisLikeCommentShareContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.likesThisLikeCommentShare), substring, timeoutMs);
  }

  async expectLikesThisLikeCommentShareValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.likesThisLikeCommentShare), value, timeoutMs);
  }

  async expectLikesThisLikeCommentShareEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.likesThisLikeCommentShare), timeoutMs);
  }

  async expectLikesThisLikeCommentShareDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.likesThisLikeCommentShare), timeoutMs);
  }

  async expectLikesThisLikeCommentShareChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.likesThisLikeCommentShare), timeoutMs);
  }

  async expectLikesThisLikeCommentShareUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.likesThisLikeCommentShare), timeoutMs);
  }

  async expectLikesThisLikeCommentShareFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.likesThisLikeCommentShare), timeoutMs);
  }

  async expectLikesThisLikeCommentShareCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.likesThisLikeCommentShare), count, timeoutMs);
  }

  async scrollLikesThisLikeCommentShareIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.likesThisLikeCommentShare));
  }

  async doubleClickSusanWescott(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.susanWescott));
  }

  async longPressSusanWescott(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.susanWescott));
  }

  async expectSusanWescottHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.susanWescott), timeoutMs);
  }

  async expectSusanWescottText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.susanWescott), expected, timeoutMs);
  }

  async expectSusanWescottContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.susanWescott), substring, timeoutMs);
  }

  async expectSusanWescottValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.susanWescott), value, timeoutMs);
  }

  async expectSusanWescottEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.susanWescott), timeoutMs);
  }

  async expectSusanWescottDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.susanWescott), timeoutMs);
  }

  async expectSusanWescottChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.susanWescott), timeoutMs);
  }

  async expectSusanWescottUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.susanWescott), timeoutMs);
  }

  async expectSusanWescottFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.susanWescott), timeoutMs);
  }

  async expectSusanWescottCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.susanWescott), count, timeoutMs);
  }

  async scrollSusanWescottIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.susanWescott));
  }

  async typeTextInput271(value: string): Promise<void> {
    await typeTextWhenVisible(webLocator(this.page, HomePage.L.input271), value);
  }

  async expectInput271Hidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.input271), timeoutMs);
  }

  async expectInput271Text(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.input271), expected, timeoutMs);
  }

  async expectInput271ContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.input271), substring, timeoutMs);
  }

  async expectInput271Value(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.input271), value, timeoutMs);
  }

  async expectInput271Enabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.input271), timeoutMs);
  }

  async expectInput271Disabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.input271), timeoutMs);
  }

  async expectInput271Checked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.input271), timeoutMs);
  }

  async expectInput271Unchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.input271), timeoutMs);
  }

  async expectInput271Focused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.input271), timeoutMs);
  }

  async expectInput271Count(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.input271), count, timeoutMs);
  }

  async scrollInput271IntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.input271));
  }

  async clickExceptionalCustomerExperienceCxNoteTest(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCxNoteTest));
  }

  async doubleClickExceptionalCustomerExperienceCxNoteTest(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCxNoteTest));
  }

  async longPressExceptionalCustomerExperienceCxNoteTest(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCxNoteTest));
  }

  async expectExceptionalCustomerExperienceCxNoteTestHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCxNoteTest), timeoutMs);
  }

  async expectExceptionalCustomerExperienceCxNoteTestText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCxNoteTest), expected, timeoutMs);
  }

  async expectExceptionalCustomerExperienceCxNoteTestContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCxNoteTest), substring, timeoutMs);
  }

  async expectExceptionalCustomerExperienceCxNoteTestValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCxNoteTest), value, timeoutMs);
  }

  async expectExceptionalCustomerExperienceCxNoteTestEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCxNoteTest), timeoutMs);
  }

  async expectExceptionalCustomerExperienceCxNoteTestDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCxNoteTest), timeoutMs);
  }

  async expectExceptionalCustomerExperienceCxNoteTestChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCxNoteTest), timeoutMs);
  }

  async expectExceptionalCustomerExperienceCxNoteTestUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCxNoteTest), timeoutMs);
  }

  async expectExceptionalCustomerExperienceCxNoteTestFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCxNoteTest), timeoutMs);
  }

  async expectExceptionalCustomerExperienceCxNoteTestCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCxNoteTest), count, timeoutMs);
  }

  async scrollExceptionalCustomerExperienceCxNoteTestIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCxNoteTest));
  }

  async doubleClickExceptionalCustomerExperienceCxNoteTest2(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCxNoteTest2));
  }

  async longPressExceptionalCustomerExperienceCxNoteTest2(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCxNoteTest2));
  }

  async expectExceptionalCustomerExperienceCxNoteTest2Hidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCxNoteTest2), timeoutMs);
  }

  async expectExceptionalCustomerExperienceCxNoteTest2Text(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCxNoteTest2), expected, timeoutMs);
  }

  async expectExceptionalCustomerExperienceCxNoteTest2ContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCxNoteTest2), substring, timeoutMs);
  }

  async expectExceptionalCustomerExperienceCxNoteTest2Value(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCxNoteTest2), value, timeoutMs);
  }

  async expectExceptionalCustomerExperienceCxNoteTest2Enabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCxNoteTest2), timeoutMs);
  }

  async expectExceptionalCustomerExperienceCxNoteTest2Disabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCxNoteTest2), timeoutMs);
  }

  async expectExceptionalCustomerExperienceCxNoteTest2Checked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCxNoteTest2), timeoutMs);
  }

  async expectExceptionalCustomerExperienceCxNoteTest2Unchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCxNoteTest2), timeoutMs);
  }

  async expectExceptionalCustomerExperienceCxNoteTest2Focused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCxNoteTest2), timeoutMs);
  }

  async expectExceptionalCustomerExperienceCxNoteTest2Count(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCxNoteTest2), count, timeoutMs);
  }

  async scrollExceptionalCustomerExperienceCxNoteTest2IntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCxNoteTest2));
  }

  async doubleClickJanaHam(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.janaHam));
  }

  async longPressJanaHam(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.janaHam));
  }

  async expectJanaHamHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.janaHam), timeoutMs);
  }

  async expectJanaHamText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.janaHam), expected, timeoutMs);
  }

  async expectJanaHamContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.janaHam), substring, timeoutMs);
  }

  async expectJanaHamValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.janaHam), value, timeoutMs);
  }

  async expectJanaHamEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.janaHam), timeoutMs);
  }

  async expectJanaHamDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.janaHam), timeoutMs);
  }

  async expectJanaHamChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.janaHam), timeoutMs);
  }

  async expectJanaHamUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.janaHam), timeoutMs);
  }

  async expectJanaHamFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.janaHam), timeoutMs);
  }

  async expectJanaHamCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.janaHam), count, timeoutMs);
  }

  async scrollJanaHamIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.janaHam));
  }

  async clickTestNoteTest(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.testNoteTest));
  }

  async doubleClickTestNoteTest(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.testNoteTest));
  }

  async longPressTestNoteTest(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.testNoteTest));
  }

  async expectTestNoteTestHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.testNoteTest), timeoutMs);
  }

  async expectTestNoteTestText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.testNoteTest), expected, timeoutMs);
  }

  async expectTestNoteTestContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.testNoteTest), substring, timeoutMs);
  }

  async expectTestNoteTestValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.testNoteTest), value, timeoutMs);
  }

  async expectTestNoteTestEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.testNoteTest), timeoutMs);
  }

  async expectTestNoteTestDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.testNoteTest), timeoutMs);
  }

  async expectTestNoteTestChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.testNoteTest), timeoutMs);
  }

  async expectTestNoteTestUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.testNoteTest), timeoutMs);
  }

  async expectTestNoteTestFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.testNoteTest), timeoutMs);
  }

  async expectTestNoteTestCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.testNoteTest), count, timeoutMs);
  }

  async scrollTestNoteTestIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.testNoteTest));
  }

  async clickNoteTestNoteTest(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.noteTestNoteTest));
  }

  async doubleClickNoteTestNoteTest(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.noteTestNoteTest));
  }

  async longPressNoteTestNoteTest(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.noteTestNoteTest));
  }

  async expectNoteTestNoteTestHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.noteTestNoteTest), timeoutMs);
  }

  async expectNoteTestNoteTestText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.noteTestNoteTest), expected, timeoutMs);
  }

  async expectNoteTestNoteTestContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.noteTestNoteTest), substring, timeoutMs);
  }

  async expectNoteTestNoteTestValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.noteTestNoteTest), value, timeoutMs);
  }

  async expectNoteTestNoteTestEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.noteTestNoteTest), timeoutMs);
  }

  async expectNoteTestNoteTestDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.noteTestNoteTest), timeoutMs);
  }

  async expectNoteTestNoteTestChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.noteTestNoteTest), timeoutMs);
  }

  async expectNoteTestNoteTestUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.noteTestNoteTest), timeoutMs);
  }

  async expectNoteTestNoteTestFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.noteTestNoteTest), timeoutMs);
  }

  async expectNoteTestNoteTestCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.noteTestNoteTest), count, timeoutMs);
  }

  async scrollNoteTestNoteTestIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.noteTestNoteTest));
  }

  async doubleClickViewFileTest(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.viewFileTest));
  }

  async longPressViewFileTest(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.viewFileTest));
  }

  async expectViewFileTestHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.viewFileTest), timeoutMs);
  }

  async expectViewFileTestText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.viewFileTest), expected, timeoutMs);
  }

  async expectViewFileTestContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.viewFileTest), substring, timeoutMs);
  }

  async expectViewFileTestValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.viewFileTest), value, timeoutMs);
  }

  async expectViewFileTestEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.viewFileTest), timeoutMs);
  }

  async expectViewFileTestDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.viewFileTest), timeoutMs);
  }

  async expectViewFileTestChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.viewFileTest), timeoutMs);
  }

  async expectViewFileTestUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.viewFileTest), timeoutMs);
  }

  async expectViewFileTestFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.viewFileTest), timeoutMs);
  }

  async expectViewFileTestCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.viewFileTest), count, timeoutMs);
  }

  async scrollViewFileTestIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.viewFileTest));
  }

  async doubleClickSeenBy113NoteTest(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.seenBy113NoteTest));
  }

  async longPressSeenBy113NoteTest(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.seenBy113NoteTest));
  }

  async expectSeenBy113NoteTestHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.seenBy113NoteTest), timeoutMs);
  }

  async expectSeenBy113NoteTestText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.seenBy113NoteTest), expected, timeoutMs);
  }

  async expectSeenBy113NoteTestContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.seenBy113NoteTest), substring, timeoutMs);
  }

  async expectSeenBy113NoteTestValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.seenBy113NoteTest), value, timeoutMs);
  }

  async expectSeenBy113NoteTestEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.seenBy113NoteTest), timeoutMs);
  }

  async expectSeenBy113NoteTestDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.seenBy113NoteTest), timeoutMs);
  }

  async expectSeenBy113NoteTestChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.seenBy113NoteTest), timeoutMs);
  }

  async expectSeenBy113NoteTestUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.seenBy113NoteTest), timeoutMs);
  }

  async expectSeenBy113NoteTestFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.seenBy113NoteTest), timeoutMs);
  }

  async expectSeenBy113NoteTestCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.seenBy113NoteTest), count, timeoutMs);
  }

  async scrollSeenBy113NoteTestIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.seenBy113NoteTest));
  }

  async doubleClickLaurenMoodie(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.laurenMoodie));
  }

  async longPressLaurenMoodie(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.laurenMoodie));
  }

  async expectLaurenMoodieHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.laurenMoodie), timeoutMs);
  }

  async expectLaurenMoodieText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.laurenMoodie), expected, timeoutMs);
  }

  async expectLaurenMoodieContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.laurenMoodie), substring, timeoutMs);
  }

  async expectLaurenMoodieValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.laurenMoodie), value, timeoutMs);
  }

  async expectLaurenMoodieEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.laurenMoodie), timeoutMs);
  }

  async expectLaurenMoodieDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.laurenMoodie), timeoutMs);
  }

  async expectLaurenMoodieChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.laurenMoodie), timeoutMs);
  }

  async expectLaurenMoodieUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.laurenMoodie), timeoutMs);
  }

  async expectLaurenMoodieFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.laurenMoodie), timeoutMs);
  }

  async expectLaurenMoodieCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.laurenMoodie), count, timeoutMs);
  }

  async scrollLaurenMoodieIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.laurenMoodie));
  }

  async clickRonaldLoftonLikeComment(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.ronaldLoftonLikeComment));
  }

  async doubleClickRonaldLoftonLikeComment(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.ronaldLoftonLikeComment));
  }

  async longPressRonaldLoftonLikeComment(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.ronaldLoftonLikeComment));
  }

  async expectRonaldLoftonLikeCommentHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.ronaldLoftonLikeComment), timeoutMs);
  }

  async expectRonaldLoftonLikeCommentText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.ronaldLoftonLikeComment), expected, timeoutMs);
  }

  async expectRonaldLoftonLikeCommentContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.ronaldLoftonLikeComment), substring, timeoutMs);
  }

  async expectRonaldLoftonLikeCommentValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.ronaldLoftonLikeComment), value, timeoutMs);
  }

  async expectRonaldLoftonLikeCommentEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.ronaldLoftonLikeComment), timeoutMs);
  }

  async expectRonaldLoftonLikeCommentDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.ronaldLoftonLikeComment), timeoutMs);
  }

  async expectRonaldLoftonLikeCommentChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.ronaldLoftonLikeComment), timeoutMs);
  }

  async expectRonaldLoftonLikeCommentUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.ronaldLoftonLikeComment), timeoutMs);
  }

  async expectRonaldLoftonLikeCommentFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.ronaldLoftonLikeComment), timeoutMs);
  }

  async expectRonaldLoftonLikeCommentCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.ronaldLoftonLikeComment), count, timeoutMs);
  }

  async scrollRonaldLoftonLikeCommentIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.ronaldLoftonLikeComment));
  }

  async doubleClickRonaldLoftonLikeComment2(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.ronaldLoftonLikeComment2));
  }

  async longPressRonaldLoftonLikeComment2(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.ronaldLoftonLikeComment2));
  }

  async expectRonaldLoftonLikeComment2Hidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.ronaldLoftonLikeComment2), timeoutMs);
  }

  async expectRonaldLoftonLikeComment2Text(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.ronaldLoftonLikeComment2), expected, timeoutMs);
  }

  async expectRonaldLoftonLikeComment2ContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.ronaldLoftonLikeComment2), substring, timeoutMs);
  }

  async expectRonaldLoftonLikeComment2Value(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.ronaldLoftonLikeComment2), value, timeoutMs);
  }

  async expectRonaldLoftonLikeComment2Enabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.ronaldLoftonLikeComment2), timeoutMs);
  }

  async expectRonaldLoftonLikeComment2Disabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.ronaldLoftonLikeComment2), timeoutMs);
  }

  async expectRonaldLoftonLikeComment2Checked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.ronaldLoftonLikeComment2), timeoutMs);
  }

  async expectRonaldLoftonLikeComment2Unchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.ronaldLoftonLikeComment2), timeoutMs);
  }

  async expectRonaldLoftonLikeComment2Focused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.ronaldLoftonLikeComment2), timeoutMs);
  }

  async expectRonaldLoftonLikeComment2Count(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.ronaldLoftonLikeComment2), count, timeoutMs);
  }

  async scrollRonaldLoftonLikeComment2IntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.ronaldLoftonLikeComment2));
  }

  async clickToUkgInternalOnlyLikeComment(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.toUkgInternalOnlyLikeComment));
  }

  async doubleClickToUkgInternalOnlyLikeComment(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.toUkgInternalOnlyLikeComment));
  }

  async longPressToUkgInternalOnlyLikeComment(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.toUkgInternalOnlyLikeComment));
  }

  async expectToUkgInternalOnlyLikeCommentHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.toUkgInternalOnlyLikeComment), timeoutMs);
  }

  async expectToUkgInternalOnlyLikeCommentText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.toUkgInternalOnlyLikeComment), expected, timeoutMs);
  }

  async expectToUkgInternalOnlyLikeCommentContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.toUkgInternalOnlyLikeComment), substring, timeoutMs);
  }

  async expectToUkgInternalOnlyLikeCommentValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.toUkgInternalOnlyLikeComment), value, timeoutMs);
  }

  async expectToUkgInternalOnlyLikeCommentEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.toUkgInternalOnlyLikeComment), timeoutMs);
  }

  async expectToUkgInternalOnlyLikeCommentDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.toUkgInternalOnlyLikeComment), timeoutMs);
  }

  async expectToUkgInternalOnlyLikeCommentChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.toUkgInternalOnlyLikeComment), timeoutMs);
  }

  async expectToUkgInternalOnlyLikeCommentUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.toUkgInternalOnlyLikeComment), timeoutMs);
  }

  async expectToUkgInternalOnlyLikeCommentFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.toUkgInternalOnlyLikeComment), timeoutMs);
  }

  async expectToUkgInternalOnlyLikeCommentCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.toUkgInternalOnlyLikeComment), count, timeoutMs);
  }

  async scrollToUkgInternalOnlyLikeCommentIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.toUkgInternalOnlyLikeComment));
  }

  async clickHiExceptionalCustomerExperience(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.hiExceptionalCustomerExperience));
  }

  async doubleClickHiExceptionalCustomerExperience(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.hiExceptionalCustomerExperience));
  }

  async longPressHiExceptionalCustomerExperience(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.hiExceptionalCustomerExperience));
  }

  async expectHiExceptionalCustomerExperienceHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.hiExceptionalCustomerExperience), timeoutMs);
  }

  async expectHiExceptionalCustomerExperienceText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.hiExceptionalCustomerExperience), expected, timeoutMs);
  }

  async expectHiExceptionalCustomerExperienceContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.hiExceptionalCustomerExperience), substring, timeoutMs);
  }

  async expectHiExceptionalCustomerExperienceValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.hiExceptionalCustomerExperience), value, timeoutMs);
  }

  async expectHiExceptionalCustomerExperienceEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.hiExceptionalCustomerExperience), timeoutMs);
  }

  async expectHiExceptionalCustomerExperienceDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.hiExceptionalCustomerExperience), timeoutMs);
  }

  async expectHiExceptionalCustomerExperienceChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.hiExceptionalCustomerExperience), timeoutMs);
  }

  async expectHiExceptionalCustomerExperienceUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.hiExceptionalCustomerExperience), timeoutMs);
  }

  async expectHiExceptionalCustomerExperienceFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.hiExceptionalCustomerExperience), timeoutMs);
  }

  async expectHiExceptionalCustomerExperienceCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.hiExceptionalCustomerExperience), count, timeoutMs);
  }

  async scrollHiExceptionalCustomerExperienceIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.hiExceptionalCustomerExperience));
  }

  async clickHi(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.hi));
  }

  async doubleClickHi(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.hi));
  }

  async longPressHi(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.hi));
  }

  async expectHiHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.hi), timeoutMs);
  }

  async expectHiText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.hi), expected, timeoutMs);
  }

  async expectHiContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.hi), substring, timeoutMs);
  }

  async expectHiValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.hi), value, timeoutMs);
  }

  async expectHiEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.hi), timeoutMs);
  }

  async expectHiDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.hi), timeoutMs);
  }

  async expectHiChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.hi), timeoutMs);
  }

  async expectHiUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.hi), timeoutMs);
  }

  async expectHiFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.hi), timeoutMs);
  }

  async expectHiCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.hi), count, timeoutMs);
  }

  async scrollHiIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.hi));
  }

  async clickCanYouPlease(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.canYouPlease));
  }

  async doubleClickCanYouPlease(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.canYouPlease));
  }

  async longPressCanYouPlease(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.canYouPlease));
  }

  async expectCanYouPleaseHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.canYouPlease), timeoutMs);
  }

  async expectCanYouPleaseText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.canYouPlease), expected, timeoutMs);
  }

  async expectCanYouPleaseContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.canYouPlease), substring, timeoutMs);
  }

  async expectCanYouPleaseValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.canYouPlease), value, timeoutMs);
  }

  async expectCanYouPleaseEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.canYouPlease), timeoutMs);
  }

  async expectCanYouPleaseDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.canYouPlease), timeoutMs);
  }

  async expectCanYouPleaseChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.canYouPlease), timeoutMs);
  }

  async expectCanYouPleaseUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.canYouPlease), timeoutMs);
  }

  async expectCanYouPleaseFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.canYouPlease), timeoutMs);
  }

  async expectCanYouPleaseCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.canYouPlease), count, timeoutMs);
  }

  async scrollCanYouPleaseIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.canYouPlease));
  }

  async doubleClickCommentLikeComment3(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.commentLikeComment3));
  }

  async longPressCommentLikeComment3(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.commentLikeComment3));
  }

  async expectCommentLikeComment3Hidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.commentLikeComment3), timeoutMs);
  }

  async expectCommentLikeComment3Text(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.commentLikeComment3), expected, timeoutMs);
  }

  async expectCommentLikeComment3ContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.commentLikeComment3), substring, timeoutMs);
  }

  async expectCommentLikeComment3Value(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.commentLikeComment3), value, timeoutMs);
  }

  async expectCommentLikeComment3Enabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.commentLikeComment3), timeoutMs);
  }

  async expectCommentLikeComment3Disabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.commentLikeComment3), timeoutMs);
  }

  async expectCommentLikeComment3Checked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.commentLikeComment3), timeoutMs);
  }

  async expectCommentLikeComment3Unchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.commentLikeComment3), timeoutMs);
  }

  async expectCommentLikeComment3Focused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.commentLikeComment3), timeoutMs);
  }

  async expectCommentLikeComment3Count(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.commentLikeComment3), count, timeoutMs);
  }

  async scrollCommentLikeComment3IntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.commentLikeComment3));
  }

  async doubleClickSeenBy52LikeComment(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.seenBy52LikeComment));
  }

  async longPressSeenBy52LikeComment(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.seenBy52LikeComment));
  }

  async expectSeenBy52LikeCommentHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.seenBy52LikeComment), timeoutMs);
  }

  async expectSeenBy52LikeCommentText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.seenBy52LikeComment), expected, timeoutMs);
  }

  async expectSeenBy52LikeCommentContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.seenBy52LikeComment), substring, timeoutMs);
  }

  async expectSeenBy52LikeCommentValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.seenBy52LikeComment), value, timeoutMs);
  }

  async expectSeenBy52LikeCommentEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.seenBy52LikeComment), timeoutMs);
  }

  async expectSeenBy52LikeCommentDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.seenBy52LikeComment), timeoutMs);
  }

  async expectSeenBy52LikeCommentChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.seenBy52LikeComment), timeoutMs);
  }

  async expectSeenBy52LikeCommentUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.seenBy52LikeComment), timeoutMs);
  }

  async expectSeenBy52LikeCommentFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.seenBy52LikeComment), timeoutMs);
  }

  async expectSeenBy52LikeCommentCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.seenBy52LikeComment), count, timeoutMs);
  }

  async scrollSeenBy52LikeCommentIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.seenBy52LikeComment));
  }

  async clickGouravSharma2Years(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.gouravSharma2Years));
  }

  async doubleClickGouravSharma2Years(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.gouravSharma2Years));
  }

  async longPressGouravSharma2Years(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.gouravSharma2Years));
  }

  async expectGouravSharma2YearsHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.gouravSharma2Years), timeoutMs);
  }

  async expectGouravSharma2YearsText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.gouravSharma2Years), expected, timeoutMs);
  }

  async expectGouravSharma2YearsContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.gouravSharma2Years), substring, timeoutMs);
  }

  async expectGouravSharma2YearsValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.gouravSharma2Years), value, timeoutMs);
  }

  async expectGouravSharma2YearsEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.gouravSharma2Years), timeoutMs);
  }

  async expectGouravSharma2YearsDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.gouravSharma2Years), timeoutMs);
  }

  async expectGouravSharma2YearsChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.gouravSharma2Years), timeoutMs);
  }

  async expectGouravSharma2YearsUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.gouravSharma2Years), timeoutMs);
  }

  async expectGouravSharma2YearsFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.gouravSharma2Years), timeoutMs);
  }

  async expectGouravSharma2YearsCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.gouravSharma2Years), count, timeoutMs);
  }

  async scrollGouravSharma2YearsIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.gouravSharma2Years));
  }

  async doubleClickGouravSharmaLikeComment(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.gouravSharmaLikeComment));
  }

  async longPressGouravSharmaLikeComment(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.gouravSharmaLikeComment));
  }

  async expectGouravSharmaLikeCommentHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.gouravSharmaLikeComment), timeoutMs);
  }

  async expectGouravSharmaLikeCommentText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.gouravSharmaLikeComment), expected, timeoutMs);
  }

  async expectGouravSharmaLikeCommentContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.gouravSharmaLikeComment), substring, timeoutMs);
  }

  async expectGouravSharmaLikeCommentValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.gouravSharmaLikeComment), value, timeoutMs);
  }

  async expectGouravSharmaLikeCommentEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.gouravSharmaLikeComment), timeoutMs);
  }

  async expectGouravSharmaLikeCommentDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.gouravSharmaLikeComment), timeoutMs);
  }

  async expectGouravSharmaLikeCommentChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.gouravSharmaLikeComment), timeoutMs);
  }

  async expectGouravSharmaLikeCommentUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.gouravSharmaLikeComment), timeoutMs);
  }

  async expectGouravSharmaLikeCommentFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.gouravSharmaLikeComment), timeoutMs);
  }

  async expectGouravSharmaLikeCommentCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.gouravSharmaLikeComment), count, timeoutMs);
  }

  async scrollGouravSharmaLikeCommentIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.gouravSharmaLikeComment));
  }

  async longPressActionsForThisFeedLikeComment2(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.actionsForThisFeedLikeComment2));
  }

  async expectActionsForThisFeedLikeComment2Hidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.actionsForThisFeedLikeComment2), timeoutMs);
  }

  async expectActionsForThisFeedLikeComment2Text(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.actionsForThisFeedLikeComment2), expected, timeoutMs);
  }

  async expectActionsForThisFeedLikeComment2ContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.actionsForThisFeedLikeComment2), substring, timeoutMs);
  }

  async expectActionsForThisFeedLikeComment2Value(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.actionsForThisFeedLikeComment2), value, timeoutMs);
  }

  async expectActionsForThisFeedLikeComment2Enabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.actionsForThisFeedLikeComment2), timeoutMs);
  }

  async expectActionsForThisFeedLikeComment2Disabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.actionsForThisFeedLikeComment2), timeoutMs);
  }

  async expectActionsForThisFeedLikeComment2Checked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.actionsForThisFeedLikeComment2), timeoutMs);
  }

  async expectActionsForThisFeedLikeComment2Unchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.actionsForThisFeedLikeComment2), timeoutMs);
  }

  async expectActionsForThisFeedLikeComment2Focused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.actionsForThisFeedLikeComment2), timeoutMs);
  }

  async expectActionsForThisFeedLikeComment2Count(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.actionsForThisFeedLikeComment2), count, timeoutMs);
  }

  async scrollActionsForThisFeedLikeComment2IntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.actionsForThisFeedLikeComment2));
  }

  async clickHiRonaldIfYou(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.hiRonaldIfYou));
  }

  async doubleClickHiRonaldIfYou(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.hiRonaldIfYou));
  }

  async longPressHiRonaldIfYou(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.hiRonaldIfYou));
  }

  async expectHiRonaldIfYouHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.hiRonaldIfYou), timeoutMs);
  }

  async expectHiRonaldIfYouText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.hiRonaldIfYou), expected, timeoutMs);
  }

  async expectHiRonaldIfYouContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.hiRonaldIfYou), substring, timeoutMs);
  }

  async expectHiRonaldIfYouValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.hiRonaldIfYou), value, timeoutMs);
  }

  async expectHiRonaldIfYouEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.hiRonaldIfYou), timeoutMs);
  }

  async expectHiRonaldIfYouDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.hiRonaldIfYou), timeoutMs);
  }

  async expectHiRonaldIfYouChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.hiRonaldIfYou), timeoutMs);
  }

  async expectHiRonaldIfYouUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.hiRonaldIfYou), timeoutMs);
  }

  async expectHiRonaldIfYouFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.hiRonaldIfYou), timeoutMs);
  }

  async expectHiRonaldIfYouCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.hiRonaldIfYou), count, timeoutMs);
  }

  async scrollHiRonaldIfYouIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.hiRonaldIfYou));
  }

  async longPressShowLikes(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.showLikes));
  }

  async expectShowLikesHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.showLikes), timeoutMs);
  }

  async expectShowLikesText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.showLikes), expected, timeoutMs);
  }

  async expectShowLikesContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.showLikes), substring, timeoutMs);
  }

  async expectShowLikesValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.showLikes), value, timeoutMs);
  }

  async expectShowLikesEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.showLikes), timeoutMs);
  }

  async expectShowLikesDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.showLikes), timeoutMs);
  }

  async expectShowLikesChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.showLikes), timeoutMs);
  }

  async expectShowLikesUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.showLikes), timeoutMs);
  }

  async expectShowLikesFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.showLikes), timeoutMs);
  }

  async expectShowLikesCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.showLikes), count, timeoutMs);
  }

  async scrollShowLikesIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.showLikes));
  }

  async clickExceptionalCustomerExperienceCx(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCx));
  }

  async doubleClickExceptionalCustomerExperienceCx(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCx));
  }

  async longPressExceptionalCustomerExperienceCx(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCx));
  }

  async expectExceptionalCustomerExperienceCxHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCx), timeoutMs);
  }

  async expectExceptionalCustomerExperienceCxText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCx), expected, timeoutMs);
  }

  async expectExceptionalCustomerExperienceCxContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCx), substring, timeoutMs);
  }

  async expectExceptionalCustomerExperienceCxValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCx), value, timeoutMs);
  }

  async expectExceptionalCustomerExperienceCxEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCx), timeoutMs);
  }

  async expectExceptionalCustomerExperienceCxDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCx), timeoutMs);
  }

  async expectExceptionalCustomerExperienceCxChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCx), timeoutMs);
  }

  async expectExceptionalCustomerExperienceCxUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCx), timeoutMs);
  }

  async expectExceptionalCustomerExperienceCxFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCx), timeoutMs);
  }

  async expectExceptionalCustomerExperienceCxCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCx), count, timeoutMs);
  }

  async scrollExceptionalCustomerExperienceCxIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCx));
  }

  async doubleClickEricaDriverLikeCommentShare(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.ericaDriverLikeCommentShare));
  }

  async longPressEricaDriverLikeCommentShare(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.ericaDriverLikeCommentShare));
  }

  async expectEricaDriverLikeCommentShareHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.ericaDriverLikeCommentShare), timeoutMs);
  }

  async expectEricaDriverLikeCommentShareText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.ericaDriverLikeCommentShare), expected, timeoutMs);
  }

  async expectEricaDriverLikeCommentShareContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.ericaDriverLikeCommentShare), substring, timeoutMs);
  }

  async expectEricaDriverLikeCommentShareValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.ericaDriverLikeCommentShare), value, timeoutMs);
  }

  async expectEricaDriverLikeCommentShareEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.ericaDriverLikeCommentShare), timeoutMs);
  }

  async expectEricaDriverLikeCommentShareDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.ericaDriverLikeCommentShare), timeoutMs);
  }

  async expectEricaDriverLikeCommentShareChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.ericaDriverLikeCommentShare), timeoutMs);
  }

  async expectEricaDriverLikeCommentShareUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.ericaDriverLikeCommentShare), timeoutMs);
  }

  async expectEricaDriverLikeCommentShareFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.ericaDriverLikeCommentShare), timeoutMs);
  }

  async expectEricaDriverLikeCommentShareCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.ericaDriverLikeCommentShare), count, timeoutMs);
  }

  async scrollEricaDriverLikeCommentShareIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.ericaDriverLikeCommentShare));
  }

  async clickCustomerAdvocacyInsidersFY22(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.customerAdvocacyInsidersFY22));
  }

  async doubleClickCustomerAdvocacyInsidersFY22(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.customerAdvocacyInsidersFY22));
  }

  async longPressCustomerAdvocacyInsidersFY22(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.customerAdvocacyInsidersFY22));
  }

  async expectCustomerAdvocacyInsidersFY22Hidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.customerAdvocacyInsidersFY22), timeoutMs);
  }

  async expectCustomerAdvocacyInsidersFY22Text(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.customerAdvocacyInsidersFY22), expected, timeoutMs);
  }

  async expectCustomerAdvocacyInsidersFY22ContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.customerAdvocacyInsidersFY22), substring, timeoutMs);
  }

  async expectCustomerAdvocacyInsidersFY22Value(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.customerAdvocacyInsidersFY22), value, timeoutMs);
  }

  async expectCustomerAdvocacyInsidersFY22Enabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.customerAdvocacyInsidersFY22), timeoutMs);
  }

  async expectCustomerAdvocacyInsidersFY22Disabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.customerAdvocacyInsidersFY22), timeoutMs);
  }

  async expectCustomerAdvocacyInsidersFY22Checked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.customerAdvocacyInsidersFY22), timeoutMs);
  }

  async expectCustomerAdvocacyInsidersFY22Unchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.customerAdvocacyInsidersFY22), timeoutMs);
  }

  async expectCustomerAdvocacyInsidersFY22Focused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.customerAdvocacyInsidersFY22), timeoutMs);
  }

  async expectCustomerAdvocacyInsidersFY22Count(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.customerAdvocacyInsidersFY22), count, timeoutMs);
  }

  async scrollCustomerAdvocacyInsidersFY22IntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.customerAdvocacyInsidersFY22));
  }

  async doubleClickHttpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v86HQAQ(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v86HQAQ));
  }

  async longPressHttpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v86HQAQ(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v86HQAQ));
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v86HQAQHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v86HQAQ), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v86HQAQText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v86HQAQ), expected, timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v86HQAQContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v86HQAQ), substring, timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v86HQAQValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v86HQAQ), value, timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v86HQAQEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v86HQAQ), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v86HQAQDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v86HQAQ), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v86HQAQChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v86HQAQ), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v86HQAQUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v86HQAQ), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v86HQAQFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v86HQAQ), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v86HQAQCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v86HQAQ), count, timeoutMs);
  }

  async scrollHttpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v86HQAQIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v86HQAQ));
  }

  async clickFY22Q2Highlights(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.fY22Q2Highlights));
  }

  async doubleClickFY22Q2Highlights(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.fY22Q2Highlights));
  }

  async longPressFY22Q2Highlights(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.fY22Q2Highlights));
  }

  async expectFY22Q2HighlightsHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.fY22Q2Highlights), timeoutMs);
  }

  async expectFY22Q2HighlightsText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.fY22Q2Highlights), expected, timeoutMs);
  }

  async expectFY22Q2HighlightsContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.fY22Q2Highlights), substring, timeoutMs);
  }

  async expectFY22Q2HighlightsValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.fY22Q2Highlights), value, timeoutMs);
  }

  async expectFY22Q2HighlightsEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.fY22Q2Highlights), timeoutMs);
  }

  async expectFY22Q2HighlightsDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.fY22Q2Highlights), timeoutMs);
  }

  async expectFY22Q2HighlightsChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.fY22Q2Highlights), timeoutMs);
  }

  async expectFY22Q2HighlightsUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.fY22Q2Highlights), timeoutMs);
  }

  async expectFY22Q2HighlightsFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.fY22Q2Highlights), timeoutMs);
  }

  async expectFY22Q2HighlightsCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.fY22Q2Highlights), count, timeoutMs);
  }

  async scrollFY22Q2HighlightsIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.fY22Q2Highlights));
  }

  async clickAdvocacyInfluencedBookings385MArr(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.advocacyInfluencedBookings385MArr));
  }

  async doubleClickAdvocacyInfluencedBookings385MArr(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.advocacyInfluencedBookings385MArr));
  }

  async longPressAdvocacyInfluencedBookings385MArr(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.advocacyInfluencedBookings385MArr));
  }

  async expectAdvocacyInfluencedBookings385MArrHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.advocacyInfluencedBookings385MArr), timeoutMs);
  }

  async expectAdvocacyInfluencedBookings385MArrText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.advocacyInfluencedBookings385MArr), expected, timeoutMs);
  }

  async expectAdvocacyInfluencedBookings385MArrContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.advocacyInfluencedBookings385MArr), substring, timeoutMs);
  }

  async expectAdvocacyInfluencedBookings385MArrValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.advocacyInfluencedBookings385MArr), value, timeoutMs);
  }

  async expectAdvocacyInfluencedBookings385MArrEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.advocacyInfluencedBookings385MArr), timeoutMs);
  }

  async expectAdvocacyInfluencedBookings385MArrDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.advocacyInfluencedBookings385MArr), timeoutMs);
  }

  async expectAdvocacyInfluencedBookings385MArrChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.advocacyInfluencedBookings385MArr), timeoutMs);
  }

  async expectAdvocacyInfluencedBookings385MArrUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.advocacyInfluencedBookings385MArr), timeoutMs);
  }

  async expectAdvocacyInfluencedBookings385MArrFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.advocacyInfluencedBookings385MArr), timeoutMs);
  }

  async expectAdvocacyInfluencedBookings385MArrCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.advocacyInfluencedBookings385MArr), count, timeoutMs);
  }

  async scrollAdvocacyInfluencedBookings385MArrIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.advocacyInfluencedBookings385MArr));
  }

  async clickRelationshipManagementChunHarvey(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.relationshipManagementChunHarvey));
  }

  async doubleClickRelationshipManagementChunHarvey(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.relationshipManagementChunHarvey));
  }

  async longPressRelationshipManagementChunHarvey(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.relationshipManagementChunHarvey));
  }

  async expectRelationshipManagementChunHarveyHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.relationshipManagementChunHarvey), timeoutMs);
  }

  async expectRelationshipManagementChunHarveyText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.relationshipManagementChunHarvey), expected, timeoutMs);
  }

  async expectRelationshipManagementChunHarveyContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.relationshipManagementChunHarvey), substring, timeoutMs);
  }

  async expectRelationshipManagementChunHarveyValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.relationshipManagementChunHarvey), value, timeoutMs);
  }

  async expectRelationshipManagementChunHarveyEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.relationshipManagementChunHarvey), timeoutMs);
  }

  async expectRelationshipManagementChunHarveyDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.relationshipManagementChunHarvey), timeoutMs);
  }

  async expectRelationshipManagementChunHarveyChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.relationshipManagementChunHarvey), timeoutMs);
  }

  async expectRelationshipManagementChunHarveyUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.relationshipManagementChunHarvey), timeoutMs);
  }

  async expectRelationshipManagementChunHarveyFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.relationshipManagementChunHarvey), timeoutMs);
  }

  async expectRelationshipManagementChunHarveyCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.relationshipManagementChunHarvey), count, timeoutMs);
  }

  async scrollRelationshipManagementChunHarveyIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.relationshipManagementChunHarvey));
  }

  async clickRelationshipManagementLikeCommentShare(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.relationshipManagementLikeCommentShare));
  }

  async doubleClickRelationshipManagementLikeCommentShare(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.relationshipManagementLikeCommentShare));
  }

  async longPressRelationshipManagementLikeCommentShare(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.relationshipManagementLikeCommentShare));
  }

  async expectRelationshipManagementLikeCommentShareHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.relationshipManagementLikeCommentShare), timeoutMs);
  }

  async expectRelationshipManagementLikeCommentShareText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.relationshipManagementLikeCommentShare), expected, timeoutMs);
  }

  async expectRelationshipManagementLikeCommentShareContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.relationshipManagementLikeCommentShare), substring, timeoutMs);
  }

  async expectRelationshipManagementLikeCommentShareValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.relationshipManagementLikeCommentShare), value, timeoutMs);
  }

  async expectRelationshipManagementLikeCommentShareEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.relationshipManagementLikeCommentShare), timeoutMs);
  }

  async expectRelationshipManagementLikeCommentShareDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.relationshipManagementLikeCommentShare), timeoutMs);
  }

  async expectRelationshipManagementLikeCommentShareChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.relationshipManagementLikeCommentShare), timeoutMs);
  }

  async expectRelationshipManagementLikeCommentShareUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.relationshipManagementLikeCommentShare), timeoutMs);
  }

  async expectRelationshipManagementLikeCommentShareFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.relationshipManagementLikeCommentShare), timeoutMs);
  }

  async expectRelationshipManagementLikeCommentShareCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.relationshipManagementLikeCommentShare), count, timeoutMs);
  }

  async scrollRelationshipManagementLikeCommentShareIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.relationshipManagementLikeCommentShare));
  }

  async doubleClickHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r63MAAQ(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r63MAAQ));
  }

  async longPressHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r63MAAQ(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r63MAAQ));
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r63MAAQHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r63MAAQ), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r63MAAQText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r63MAAQ), expected, timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r63MAAQContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r63MAAQ), substring, timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r63MAAQValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r63MAAQ), value, timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r63MAAQEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r63MAAQ), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r63MAAQDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r63MAAQ), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r63MAAQChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r63MAAQ), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r63MAAQUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r63MAAQ), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r63MAAQFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r63MAAQ), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r63MAAQCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r63MAAQ), count, timeoutMs);
  }

  async scrollHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r63MAAQIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r63MAAQ));
  }

  async doubleClickHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006mcQBAAY(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006mcQBAAY));
  }

  async longPressHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006mcQBAAY(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006mcQBAAY));
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006mcQBAAYHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006mcQBAAY), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006mcQBAAYText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006mcQBAAY), expected, timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006mcQBAAYContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006mcQBAAY), substring, timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006mcQBAAYValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006mcQBAAY), value, timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006mcQBAAYEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006mcQBAAY), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006mcQBAAYDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006mcQBAAY), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006mcQBAAYChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006mcQBAAY), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006mcQBAAYUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006mcQBAAY), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006mcQBAAYFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006mcQBAAY), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006mcQBAAYCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006mcQBAAY), count, timeoutMs);
  }

  async scrollHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006mcQBAAYIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006mcQBAAY));
  }

  async clickAndLikeCommentShare(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.andLikeCommentShare));
  }

  async doubleClickAndLikeCommentShare(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.andLikeCommentShare));
  }

  async longPressAndLikeCommentShare(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.andLikeCommentShare));
  }

  async expectAndLikeCommentShareHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.andLikeCommentShare), timeoutMs);
  }

  async expectAndLikeCommentShareText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.andLikeCommentShare), expected, timeoutMs);
  }

  async expectAndLikeCommentShareContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.andLikeCommentShare), substring, timeoutMs);
  }

  async expectAndLikeCommentShareValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.andLikeCommentShare), value, timeoutMs);
  }

  async expectAndLikeCommentShareEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.andLikeCommentShare), timeoutMs);
  }

  async expectAndLikeCommentShareDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.andLikeCommentShare), timeoutMs);
  }

  async expectAndLikeCommentShareChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.andLikeCommentShare), timeoutMs);
  }

  async expectAndLikeCommentShareUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.andLikeCommentShare), timeoutMs);
  }

  async expectAndLikeCommentShareFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.andLikeCommentShare), timeoutMs);
  }

  async expectAndLikeCommentShareCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.andLikeCommentShare), count, timeoutMs);
  }

  async scrollAndLikeCommentShareIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.andLikeCommentShare));
  }

  async doubleClickHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006rOQfAAM(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006rOQfAAM));
  }

  async longPressHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006rOQfAAM(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006rOQfAAM));
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006rOQfAAMHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006rOQfAAM), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006rOQfAAMText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006rOQfAAM), expected, timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006rOQfAAMContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006rOQfAAM), substring, timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006rOQfAAMValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006rOQfAAM), value, timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006rOQfAAMEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006rOQfAAM), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006rOQfAAMDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006rOQfAAM), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006rOQfAAMChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006rOQfAAM), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006rOQfAAMUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006rOQfAAM), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006rOQfAAMFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006rOQfAAM), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006rOQfAAMCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006rOQfAAM), count, timeoutMs);
  }

  async scrollHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006rOQfAAMIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006rOQfAAM));
  }

  async clickSalesKimCalhounChrissi(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.salesKimCalhounChrissi));
  }

  async doubleClickSalesKimCalhounChrissi(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.salesKimCalhounChrissi));
  }

  async longPressSalesKimCalhounChrissi(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.salesKimCalhounChrissi));
  }

  async expectSalesKimCalhounChrissiHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.salesKimCalhounChrissi), timeoutMs);
  }

  async expectSalesKimCalhounChrissiText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.salesKimCalhounChrissi), expected, timeoutMs);
  }

  async expectSalesKimCalhounChrissiContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.salesKimCalhounChrissi), substring, timeoutMs);
  }

  async expectSalesKimCalhounChrissiValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.salesKimCalhounChrissi), value, timeoutMs);
  }

  async expectSalesKimCalhounChrissiEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.salesKimCalhounChrissi), timeoutMs);
  }

  async expectSalesKimCalhounChrissiDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.salesKimCalhounChrissi), timeoutMs);
  }

  async expectSalesKimCalhounChrissiChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.salesKimCalhounChrissi), timeoutMs);
  }

  async expectSalesKimCalhounChrissiUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.salesKimCalhounChrissi), timeoutMs);
  }

  async expectSalesKimCalhounChrissiFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.salesKimCalhounChrissi), timeoutMs);
  }

  async expectSalesKimCalhounChrissiCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.salesKimCalhounChrissi), count, timeoutMs);
  }

  async scrollSalesKimCalhounChrissiIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.salesKimCalhounChrissi));
  }

  async clickSalesLikeCommentShare(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.salesLikeCommentShare));
  }

  async doubleClickSalesLikeCommentShare(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.salesLikeCommentShare));
  }

  async longPressSalesLikeCommentShare(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.salesLikeCommentShare));
  }

  async expectSalesLikeCommentShareHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.salesLikeCommentShare), timeoutMs);
  }

  async expectSalesLikeCommentShareText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.salesLikeCommentShare), expected, timeoutMs);
  }

  async expectSalesLikeCommentShareContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.salesLikeCommentShare), substring, timeoutMs);
  }

  async expectSalesLikeCommentShareValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.salesLikeCommentShare), value, timeoutMs);
  }

  async expectSalesLikeCommentShareEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.salesLikeCommentShare), timeoutMs);
  }

  async expectSalesLikeCommentShareDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.salesLikeCommentShare), timeoutMs);
  }

  async expectSalesLikeCommentShareChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.salesLikeCommentShare), timeoutMs);
  }

  async expectSalesLikeCommentShareUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.salesLikeCommentShare), timeoutMs);
  }

  async expectSalesLikeCommentShareFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.salesLikeCommentShare), timeoutMs);
  }

  async expectSalesLikeCommentShareCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.salesLikeCommentShare), count, timeoutMs);
  }

  async scrollSalesLikeCommentShareIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.salesLikeCommentShare));
  }

  async doubleClickHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4I2AAI(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4I2AAI));
  }

  async longPressHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4I2AAI(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4I2AAI));
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4I2AAIHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4I2AAI), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4I2AAIText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4I2AAI), expected, timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4I2AAIContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4I2AAI), substring, timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4I2AAIValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4I2AAI), value, timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4I2AAIEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4I2AAI), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4I2AAIDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4I2AAI), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4I2AAIChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4I2AAI), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4I2AAIUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4I2AAI), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4I2AAIFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4I2AAI), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4I2AAICount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4I2AAI), count, timeoutMs);
  }

  async scrollHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4I2AAIIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4I2AAI));
  }

  async doubleClickHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4apAAA(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4apAAA));
  }

  async longPressHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4apAAA(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4apAAA));
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4apAAAHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4apAAA), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4apAAAText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4apAAA), expected, timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4apAAAContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4apAAA), substring, timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4apAAAValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4apAAA), value, timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4apAAAEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4apAAA), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4apAAADisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4apAAA), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4apAAAChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4apAAA), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4apAAAUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4apAAA), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4apAAAFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4apAAA), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4apAAACount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4apAAA), count, timeoutMs);
  }

  async scrollHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4apAAAIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4apAAA));
  }

  async doubleClickHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000007JXOfAAO(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000007JXOfAAO));
  }

  async longPressHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000007JXOfAAO(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000007JXOfAAO));
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000007JXOfAAOHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000007JXOfAAO), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000007JXOfAAOText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000007JXOfAAO), expected, timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000007JXOfAAOContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000007JXOfAAO), substring, timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000007JXOfAAOValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000007JXOfAAO), value, timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000007JXOfAAOEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000007JXOfAAO), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000007JXOfAAODisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000007JXOfAAO), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000007JXOfAAOChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000007JXOfAAO), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000007JXOfAAOUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000007JXOfAAO), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000007JXOfAAOFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000007JXOfAAO), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000007JXOfAAOCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000007JXOfAAO), count, timeoutMs);
  }

  async scrollHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000007JXOfAAOIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000007JXOfAAO));
  }

  async clickInsidersParticipatedIn107(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.insidersParticipatedIn107));
  }

  async doubleClickInsidersParticipatedIn107(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.insidersParticipatedIn107));
  }

  async longPressInsidersParticipatedIn107(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.insidersParticipatedIn107));
  }

  async expectInsidersParticipatedIn107Hidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.insidersParticipatedIn107), timeoutMs);
  }

  async expectInsidersParticipatedIn107Text(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.insidersParticipatedIn107), expected, timeoutMs);
  }

  async expectInsidersParticipatedIn107ContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.insidersParticipatedIn107), substring, timeoutMs);
  }

  async expectInsidersParticipatedIn107Value(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.insidersParticipatedIn107), value, timeoutMs);
  }

  async expectInsidersParticipatedIn107Enabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.insidersParticipatedIn107), timeoutMs);
  }

  async expectInsidersParticipatedIn107Disabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.insidersParticipatedIn107), timeoutMs);
  }

  async expectInsidersParticipatedIn107Checked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.insidersParticipatedIn107), timeoutMs);
  }

  async expectInsidersParticipatedIn107Unchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.insidersParticipatedIn107), timeoutMs);
  }

  async expectInsidersParticipatedIn107Focused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.insidersParticipatedIn107), timeoutMs);
  }

  async expectInsidersParticipatedIn107Count(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.insidersParticipatedIn107), count, timeoutMs);
  }

  async scrollInsidersParticipatedIn107IntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.insidersParticipatedIn107));
  }

  async clickWeSent202Insider(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.weSent202Insider));
  }

  async doubleClickWeSent202Insider(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.weSent202Insider));
  }

  async longPressWeSent202Insider(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.weSent202Insider));
  }

  async expectWeSent202InsiderHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.weSent202Insider), timeoutMs);
  }

  async expectWeSent202InsiderText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.weSent202Insider), expected, timeoutMs);
  }

  async expectWeSent202InsiderContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.weSent202Insider), substring, timeoutMs);
  }

  async expectWeSent202InsiderValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.weSent202Insider), value, timeoutMs);
  }

  async expectWeSent202InsiderEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.weSent202Insider), timeoutMs);
  }

  async expectWeSent202InsiderDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.weSent202Insider), timeoutMs);
  }

  async expectWeSent202InsiderChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.weSent202Insider), timeoutMs);
  }

  async expectWeSent202InsiderUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.weSent202Insider), timeoutMs);
  }

  async expectWeSent202InsiderFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.weSent202Insider), timeoutMs);
  }

  async expectWeSent202InsiderCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.weSent202Insider), count, timeoutMs);
  }

  async scrollWeSent202InsiderIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.weSent202Insider));
  }

  async clickInsidersParticipatedIn79(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.insidersParticipatedIn79));
  }

  async doubleClickInsidersParticipatedIn79(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.insidersParticipatedIn79));
  }

  async longPressInsidersParticipatedIn79(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.insidersParticipatedIn79));
  }

  async expectInsidersParticipatedIn79Hidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.insidersParticipatedIn79), timeoutMs);
  }

  async expectInsidersParticipatedIn79Text(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.insidersParticipatedIn79), expected, timeoutMs);
  }

  async expectInsidersParticipatedIn79ContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.insidersParticipatedIn79), substring, timeoutMs);
  }

  async expectInsidersParticipatedIn79Value(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.insidersParticipatedIn79), value, timeoutMs);
  }

  async expectInsidersParticipatedIn79Enabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.insidersParticipatedIn79), timeoutMs);
  }

  async expectInsidersParticipatedIn79Disabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.insidersParticipatedIn79), timeoutMs);
  }

  async expectInsidersParticipatedIn79Checked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.insidersParticipatedIn79), timeoutMs);
  }

  async expectInsidersParticipatedIn79Unchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.insidersParticipatedIn79), timeoutMs);
  }

  async expectInsidersParticipatedIn79Focused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.insidersParticipatedIn79), timeoutMs);
  }

  async expectInsidersParticipatedIn79Count(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.insidersParticipatedIn79), count, timeoutMs);
  }

  async scrollInsidersParticipatedIn79IntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.insidersParticipatedIn79));
  }

  async clickGotQuestionsReachOutLikeCommentShare(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.gotQuestionsReachOutLikeCommentShare));
  }

  async doubleClickGotQuestionsReachOutLikeCommentShare(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.gotQuestionsReachOutLikeCommentShare));
  }

  async longPressGotQuestionsReachOutLikeCommentShare(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.gotQuestionsReachOutLikeCommentShare));
  }

  async expectGotQuestionsReachOutLikeCommentShareHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.gotQuestionsReachOutLikeCommentShare), timeoutMs);
  }

  async expectGotQuestionsReachOutLikeCommentShareText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.gotQuestionsReachOutLikeCommentShare), expected, timeoutMs);
  }

  async expectGotQuestionsReachOutLikeCommentShareContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.gotQuestionsReachOutLikeCommentShare), substring, timeoutMs);
  }

  async expectGotQuestionsReachOutLikeCommentShareValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.gotQuestionsReachOutLikeCommentShare), value, timeoutMs);
  }

  async expectGotQuestionsReachOutLikeCommentShareEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.gotQuestionsReachOutLikeCommentShare), timeoutMs);
  }

  async expectGotQuestionsReachOutLikeCommentShareDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.gotQuestionsReachOutLikeCommentShare), timeoutMs);
  }

  async expectGotQuestionsReachOutLikeCommentShareChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.gotQuestionsReachOutLikeCommentShare), timeoutMs);
  }

  async expectGotQuestionsReachOutLikeCommentShareUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.gotQuestionsReachOutLikeCommentShare), timeoutMs);
  }

  async expectGotQuestionsReachOutLikeCommentShareFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.gotQuestionsReachOutLikeCommentShare), timeoutMs);
  }

  async expectGotQuestionsReachOutLikeCommentShareCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.gotQuestionsReachOutLikeCommentShare), count, timeoutMs);
  }

  async scrollGotQuestionsReachOutLikeCommentShareIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.gotQuestionsReachOutLikeCommentShare));
  }

  async doubleClickInsidersUkgComLikeCommentShare(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.insidersUkgComLikeCommentShare));
  }

  async longPressInsidersUkgComLikeCommentShare(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.insidersUkgComLikeCommentShare));
  }

  async expectInsidersUkgComLikeCommentShareHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.insidersUkgComLikeCommentShare), timeoutMs);
  }

  async expectInsidersUkgComLikeCommentShareText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.insidersUkgComLikeCommentShare), expected, timeoutMs);
  }

  async expectInsidersUkgComLikeCommentShareContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.insidersUkgComLikeCommentShare), substring, timeoutMs);
  }

  async expectInsidersUkgComLikeCommentShareValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.insidersUkgComLikeCommentShare), value, timeoutMs);
  }

  async expectInsidersUkgComLikeCommentShareEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.insidersUkgComLikeCommentShare), timeoutMs);
  }

  async expectInsidersUkgComLikeCommentShareDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.insidersUkgComLikeCommentShare), timeoutMs);
  }

  async expectInsidersUkgComLikeCommentShareChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.insidersUkgComLikeCommentShare), timeoutMs);
  }

  async expectInsidersUkgComLikeCommentShareUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.insidersUkgComLikeCommentShare), timeoutMs);
  }

  async expectInsidersUkgComLikeCommentShareFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.insidersUkgComLikeCommentShare), timeoutMs);
  }

  async expectInsidersUkgComLikeCommentShareCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.insidersUkgComLikeCommentShare), count, timeoutMs);
  }

  async scrollInsidersUkgComLikeCommentShareIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.insidersUkgComLikeCommentShare));
  }

  async clickLindaZavatskyCarlyStorie(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.lindaZavatskyCarlyStorie));
  }

  async doubleClickLindaZavatskyCarlyStorie(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.lindaZavatskyCarlyStorie));
  }

  async longPressLindaZavatskyCarlyStorie(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.lindaZavatskyCarlyStorie));
  }

  async expectLindaZavatskyCarlyStorieHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.lindaZavatskyCarlyStorie), timeoutMs);
  }

  async expectLindaZavatskyCarlyStorieText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.lindaZavatskyCarlyStorie), expected, timeoutMs);
  }

  async expectLindaZavatskyCarlyStorieContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.lindaZavatskyCarlyStorie), substring, timeoutMs);
  }

  async expectLindaZavatskyCarlyStorieValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.lindaZavatskyCarlyStorie), value, timeoutMs);
  }

  async expectLindaZavatskyCarlyStorieEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.lindaZavatskyCarlyStorie), timeoutMs);
  }

  async expectLindaZavatskyCarlyStorieDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.lindaZavatskyCarlyStorie), timeoutMs);
  }

  async expectLindaZavatskyCarlyStorieChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.lindaZavatskyCarlyStorie), timeoutMs);
  }

  async expectLindaZavatskyCarlyStorieUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.lindaZavatskyCarlyStorie), timeoutMs);
  }

  async expectLindaZavatskyCarlyStorieFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.lindaZavatskyCarlyStorie), timeoutMs);
  }

  async expectLindaZavatskyCarlyStorieCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.lindaZavatskyCarlyStorie), count, timeoutMs);
  }

  async scrollLindaZavatskyCarlyStorieIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.lindaZavatskyCarlyStorie));
  }

  async doubleClickLindaZavatsky(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.lindaZavatsky));
  }

  async longPressLindaZavatsky(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.lindaZavatsky));
  }

  async expectLindaZavatskyHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.lindaZavatsky), timeoutMs);
  }

  async expectLindaZavatskyText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.lindaZavatsky), expected, timeoutMs);
  }

  async expectLindaZavatskyContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.lindaZavatsky), substring, timeoutMs);
  }

  async expectLindaZavatskyValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.lindaZavatsky), value, timeoutMs);
  }

  async expectLindaZavatskyEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.lindaZavatsky), timeoutMs);
  }

  async expectLindaZavatskyDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.lindaZavatsky), timeoutMs);
  }

  async expectLindaZavatskyChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.lindaZavatsky), timeoutMs);
  }

  async expectLindaZavatskyUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.lindaZavatsky), timeoutMs);
  }

  async expectLindaZavatskyFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.lindaZavatsky), timeoutMs);
  }

  async expectLindaZavatskyCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.lindaZavatsky), count, timeoutMs);
  }

  async scrollLindaZavatskyIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.lindaZavatsky));
  }

  async doubleClickCarlyStorie(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.carlyStorie));
  }

  async longPressCarlyStorie(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.carlyStorie));
  }

  async expectCarlyStorieHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.carlyStorie), timeoutMs);
  }

  async expectCarlyStorieText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.carlyStorie), expected, timeoutMs);
  }

  async expectCarlyStorieContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.carlyStorie), substring, timeoutMs);
  }

  async expectCarlyStorieValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.carlyStorie), value, timeoutMs);
  }

  async expectCarlyStorieEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.carlyStorie), timeoutMs);
  }

  async expectCarlyStorieDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.carlyStorie), timeoutMs);
  }

  async expectCarlyStorieChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.carlyStorie), timeoutMs);
  }

  async expectCarlyStorieUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.carlyStorie), timeoutMs);
  }

  async expectCarlyStorieFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.carlyStorie), timeoutMs);
  }

  async expectCarlyStorieCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.carlyStorie), count, timeoutMs);
  }

  async scrollCarlyStorieIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.carlyStorie));
  }

  async doubleClickKimberlyCalhoun(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.kimberlyCalhoun));
  }

  async longPressKimberlyCalhoun(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.kimberlyCalhoun));
  }

  async expectKimberlyCalhounHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.kimberlyCalhoun), timeoutMs);
  }

  async expectKimberlyCalhounText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.kimberlyCalhoun), expected, timeoutMs);
  }

  async expectKimberlyCalhounContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.kimberlyCalhoun), substring, timeoutMs);
  }

  async expectKimberlyCalhounValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.kimberlyCalhoun), value, timeoutMs);
  }

  async expectKimberlyCalhounEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.kimberlyCalhoun), timeoutMs);
  }

  async expectKimberlyCalhounDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.kimberlyCalhoun), timeoutMs);
  }

  async expectKimberlyCalhounChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.kimberlyCalhoun), timeoutMs);
  }

  async expectKimberlyCalhounUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.kimberlyCalhoun), timeoutMs);
  }

  async expectKimberlyCalhounFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.kimberlyCalhoun), timeoutMs);
  }

  async expectKimberlyCalhounCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.kimberlyCalhoun), count, timeoutMs);
  }

  async scrollKimberlyCalhounIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.kimberlyCalhoun));
  }

  async doubleClickAllThingsSalesLikeCommentShare(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.allThingsSalesLikeCommentShare));
  }

  async longPressAllThingsSalesLikeCommentShare(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.allThingsSalesLikeCommentShare));
  }

  async expectAllThingsSalesLikeCommentShareHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.allThingsSalesLikeCommentShare), timeoutMs);
  }

  async expectAllThingsSalesLikeCommentShareText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.allThingsSalesLikeCommentShare), expected, timeoutMs);
  }

  async expectAllThingsSalesLikeCommentShareContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.allThingsSalesLikeCommentShare), substring, timeoutMs);
  }

  async expectAllThingsSalesLikeCommentShareValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.allThingsSalesLikeCommentShare), value, timeoutMs);
  }

  async expectAllThingsSalesLikeCommentShareEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.allThingsSalesLikeCommentShare), timeoutMs);
  }

  async expectAllThingsSalesLikeCommentShareDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.allThingsSalesLikeCommentShare), timeoutMs);
  }

  async expectAllThingsSalesLikeCommentShareChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.allThingsSalesLikeCommentShare), timeoutMs);
  }

  async expectAllThingsSalesLikeCommentShareUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.allThingsSalesLikeCommentShare), timeoutMs);
  }

  async expectAllThingsSalesLikeCommentShareFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.allThingsSalesLikeCommentShare), timeoutMs);
  }

  async expectAllThingsSalesLikeCommentShareCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.allThingsSalesLikeCommentShare), count, timeoutMs);
  }

  async scrollAllThingsSalesLikeCommentShareIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.allThingsSalesLikeCommentShare));
  }

  async clickArchivedLikeCommentShare(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.archivedLikeCommentShare));
  }

  async doubleClickArchivedLikeCommentShare(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.archivedLikeCommentShare));
  }

  async longPressArchivedLikeCommentShare(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.archivedLikeCommentShare));
  }

  async expectArchivedLikeCommentShareHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.archivedLikeCommentShare), timeoutMs);
  }

  async expectArchivedLikeCommentShareText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.archivedLikeCommentShare), expected, timeoutMs);
  }

  async expectArchivedLikeCommentShareContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.archivedLikeCommentShare), substring, timeoutMs);
  }

  async expectArchivedLikeCommentShareValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.archivedLikeCommentShare), value, timeoutMs);
  }

  async expectArchivedLikeCommentShareEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.archivedLikeCommentShare), timeoutMs);
  }

  async expectArchivedLikeCommentShareDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.archivedLikeCommentShare), timeoutMs);
  }

  async expectArchivedLikeCommentShareChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.archivedLikeCommentShare), timeoutMs);
  }

  async expectArchivedLikeCommentShareUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.archivedLikeCommentShare), timeoutMs);
  }

  async expectArchivedLikeCommentShareFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.archivedLikeCommentShare), timeoutMs);
  }

  async expectArchivedLikeCommentShareCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.archivedLikeCommentShare), count, timeoutMs);
  }

  async scrollArchivedLikeCommentShareIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.archivedLikeCommentShare));
  }

  async doubleClickAllThingsCustomerSuccessLikeCommentShare(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.allThingsCustomerSuccessLikeCommentShare));
  }

  async longPressAllThingsCustomerSuccessLikeCommentShare(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.allThingsCustomerSuccessLikeCommentShare));
  }

  async expectAllThingsCustomerSuccessLikeCommentShareHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.allThingsCustomerSuccessLikeCommentShare), timeoutMs);
  }

  async expectAllThingsCustomerSuccessLikeCommentShareText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.allThingsCustomerSuccessLikeCommentShare), expected, timeoutMs);
  }

  async expectAllThingsCustomerSuccessLikeCommentShareContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.allThingsCustomerSuccessLikeCommentShare), substring, timeoutMs);
  }

  async expectAllThingsCustomerSuccessLikeCommentShareValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.allThingsCustomerSuccessLikeCommentShare), value, timeoutMs);
  }

  async expectAllThingsCustomerSuccessLikeCommentShareEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.allThingsCustomerSuccessLikeCommentShare), timeoutMs);
  }

  async expectAllThingsCustomerSuccessLikeCommentShareDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.allThingsCustomerSuccessLikeCommentShare), timeoutMs);
  }

  async expectAllThingsCustomerSuccessLikeCommentShareChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.allThingsCustomerSuccessLikeCommentShare), timeoutMs);
  }

  async expectAllThingsCustomerSuccessLikeCommentShareUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.allThingsCustomerSuccessLikeCommentShare), timeoutMs);
  }

  async expectAllThingsCustomerSuccessLikeCommentShareFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.allThingsCustomerSuccessLikeCommentShare), timeoutMs);
  }

  async expectAllThingsCustomerSuccessLikeCommentShareCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.allThingsCustomerSuccessLikeCommentShare), count, timeoutMs);
  }

  async scrollAllThingsCustomerSuccessLikeCommentShareIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.allThingsCustomerSuccessLikeCommentShare));
  }

  async doubleClickAllThingsServicesLikeCommentShare(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.allThingsServicesLikeCommentShare));
  }

  async longPressAllThingsServicesLikeCommentShare(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.allThingsServicesLikeCommentShare));
  }

  async expectAllThingsServicesLikeCommentShareHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.allThingsServicesLikeCommentShare), timeoutMs);
  }

  async expectAllThingsServicesLikeCommentShareText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.allThingsServicesLikeCommentShare), expected, timeoutMs);
  }

  async expectAllThingsServicesLikeCommentShareContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.allThingsServicesLikeCommentShare), substring, timeoutMs);
  }

  async expectAllThingsServicesLikeCommentShareValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.allThingsServicesLikeCommentShare), value, timeoutMs);
  }

  async expectAllThingsServicesLikeCommentShareEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.allThingsServicesLikeCommentShare), timeoutMs);
  }

  async expectAllThingsServicesLikeCommentShareDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.allThingsServicesLikeCommentShare), timeoutMs);
  }

  async expectAllThingsServicesLikeCommentShareChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.allThingsServicesLikeCommentShare), timeoutMs);
  }

  async expectAllThingsServicesLikeCommentShareUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.allThingsServicesLikeCommentShare), timeoutMs);
  }

  async expectAllThingsServicesLikeCommentShareFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.allThingsServicesLikeCommentShare), timeoutMs);
  }

  async expectAllThingsServicesLikeCommentShareCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.allThingsServicesLikeCommentShare), count, timeoutMs);
  }

  async scrollAllThingsServicesLikeCommentShareIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.allThingsServicesLikeCommentShare));
  }

  async doubleClickSeenBy40LikeCommentShare(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.seenBy40LikeCommentShare));
  }

  async longPressSeenBy40LikeCommentShare(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.seenBy40LikeCommentShare));
  }

  async expectSeenBy40LikeCommentShareHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.seenBy40LikeCommentShare), timeoutMs);
  }

  async expectSeenBy40LikeCommentShareText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.seenBy40LikeCommentShare), expected, timeoutMs);
  }

  async expectSeenBy40LikeCommentShareContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.seenBy40LikeCommentShare), substring, timeoutMs);
  }

  async expectSeenBy40LikeCommentShareValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.seenBy40LikeCommentShare), value, timeoutMs);
  }

  async expectSeenBy40LikeCommentShareEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.seenBy40LikeCommentShare), timeoutMs);
  }

  async expectSeenBy40LikeCommentShareDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.seenBy40LikeCommentShare), timeoutMs);
  }

  async expectSeenBy40LikeCommentShareChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.seenBy40LikeCommentShare), timeoutMs);
  }

  async expectSeenBy40LikeCommentShareUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.seenBy40LikeCommentShare), timeoutMs);
  }

  async expectSeenBy40LikeCommentShareFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.seenBy40LikeCommentShare), timeoutMs);
  }

  async expectSeenBy40LikeCommentShareCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.seenBy40LikeCommentShare), count, timeoutMs);
  }

  async scrollSeenBy40LikeCommentShareIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.seenBy40LikeCommentShare));
  }

  async clickAndLikeLikeCommentShare(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.andLikeLikeCommentShare));
  }

  async doubleClickAndLikeLikeCommentShare(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.andLikeLikeCommentShare));
  }

  async longPressAndLikeLikeCommentShare(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.andLikeLikeCommentShare));
  }

  async expectAndLikeLikeCommentShareHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.andLikeLikeCommentShare), timeoutMs);
  }

  async expectAndLikeLikeCommentShareText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.andLikeLikeCommentShare), expected, timeoutMs);
  }

  async expectAndLikeLikeCommentShareContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.andLikeLikeCommentShare), substring, timeoutMs);
  }

  async expectAndLikeLikeCommentShareValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.andLikeLikeCommentShare), value, timeoutMs);
  }

  async expectAndLikeLikeCommentShareEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.andLikeLikeCommentShare), timeoutMs);
  }

  async expectAndLikeLikeCommentShareDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.andLikeLikeCommentShare), timeoutMs);
  }

  async expectAndLikeLikeCommentShareChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.andLikeLikeCommentShare), timeoutMs);
  }

  async expectAndLikeLikeCommentShareUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.andLikeLikeCommentShare), timeoutMs);
  }

  async expectAndLikeLikeCommentShareFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.andLikeLikeCommentShare), timeoutMs);
  }

  async expectAndLikeLikeCommentShareCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.andLikeLikeCommentShare), count, timeoutMs);
  }

  async scrollAndLikeLikeCommentShareIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.andLikeLikeCommentShare));
  }

  async doubleClickOpalWagnac(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.opalWagnac));
  }

  async longPressOpalWagnac(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.opalWagnac));
  }

  async expectOpalWagnacHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.opalWagnac), timeoutMs);
  }

  async expectOpalWagnacText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.opalWagnac), expected, timeoutMs);
  }

  async expectOpalWagnacContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.opalWagnac), substring, timeoutMs);
  }

  async expectOpalWagnacValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.opalWagnac), value, timeoutMs);
  }

  async expectOpalWagnacEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.opalWagnac), timeoutMs);
  }

  async expectOpalWagnacDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.opalWagnac), timeoutMs);
  }

  async expectOpalWagnacChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.opalWagnac), timeoutMs);
  }

  async expectOpalWagnacUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.opalWagnac), timeoutMs);
  }

  async expectOpalWagnacFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.opalWagnac), timeoutMs);
  }

  async expectOpalWagnacCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.opalWagnac), count, timeoutMs);
  }

  async scrollOpalWagnacIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.opalWagnac));
  }

  async doubleClickOrielSilvaLikeCommentShare(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.orielSilvaLikeCommentShare));
  }

  async longPressOrielSilvaLikeCommentShare(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.orielSilvaLikeCommentShare));
  }

  async expectOrielSilvaLikeCommentShareHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.orielSilvaLikeCommentShare), timeoutMs);
  }

  async expectOrielSilvaLikeCommentShareText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.orielSilvaLikeCommentShare), expected, timeoutMs);
  }

  async expectOrielSilvaLikeCommentShareContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.orielSilvaLikeCommentShare), substring, timeoutMs);
  }

  async expectOrielSilvaLikeCommentShareValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.orielSilvaLikeCommentShare), value, timeoutMs);
  }

  async expectOrielSilvaLikeCommentShareEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.orielSilvaLikeCommentShare), timeoutMs);
  }

  async expectOrielSilvaLikeCommentShareDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.orielSilvaLikeCommentShare), timeoutMs);
  }

  async expectOrielSilvaLikeCommentShareChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.orielSilvaLikeCommentShare), timeoutMs);
  }

  async expectOrielSilvaLikeCommentShareUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.orielSilvaLikeCommentShare), timeoutMs);
  }

  async expectOrielSilvaLikeCommentShareFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.orielSilvaLikeCommentShare), timeoutMs);
  }

  async expectOrielSilvaLikeCommentShareCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.orielSilvaLikeCommentShare), count, timeoutMs);
  }

  async scrollOrielSilvaLikeCommentShareIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.orielSilvaLikeCommentShare));
  }

  async doubleClickOthersLikeCommentShare(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.othersLikeCommentShare));
  }

  async longPressOthersLikeCommentShare(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.othersLikeCommentShare));
  }

  async expectOthersLikeCommentShareHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.othersLikeCommentShare), timeoutMs);
  }

  async expectOthersLikeCommentShareText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.othersLikeCommentShare), expected, timeoutMs);
  }

  async expectOthersLikeCommentShareContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.othersLikeCommentShare), substring, timeoutMs);
  }

  async expectOthersLikeCommentShareValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.othersLikeCommentShare), value, timeoutMs);
  }

  async expectOthersLikeCommentShareEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.othersLikeCommentShare), timeoutMs);
  }

  async expectOthersLikeCommentShareDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.othersLikeCommentShare), timeoutMs);
  }

  async expectOthersLikeCommentShareChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.othersLikeCommentShare), timeoutMs);
  }

  async expectOthersLikeCommentShareUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.othersLikeCommentShare), timeoutMs);
  }

  async expectOthersLikeCommentShareFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.othersLikeCommentShare), timeoutMs);
  }

  async expectOthersLikeCommentShareCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.othersLikeCommentShare), count, timeoutMs);
  }

  async scrollOthersLikeCommentShareIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.othersLikeCommentShare));
  }

  async clickCustomerAdvocacyInsidersTeam(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.customerAdvocacyInsidersTeam));
  }

  async doubleClickCustomerAdvocacyInsidersTeam(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.customerAdvocacyInsidersTeam));
  }

  async longPressCustomerAdvocacyInsidersTeam(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.customerAdvocacyInsidersTeam));
  }

  async expectCustomerAdvocacyInsidersTeamHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.customerAdvocacyInsidersTeam), timeoutMs);
  }

  async expectCustomerAdvocacyInsidersTeamText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.customerAdvocacyInsidersTeam), expected, timeoutMs);
  }

  async expectCustomerAdvocacyInsidersTeamContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.customerAdvocacyInsidersTeam), substring, timeoutMs);
  }

  async expectCustomerAdvocacyInsidersTeamValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.customerAdvocacyInsidersTeam), value, timeoutMs);
  }

  async expectCustomerAdvocacyInsidersTeamEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.customerAdvocacyInsidersTeam), timeoutMs);
  }

  async expectCustomerAdvocacyInsidersTeamDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.customerAdvocacyInsidersTeam), timeoutMs);
  }

  async expectCustomerAdvocacyInsidersTeamChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.customerAdvocacyInsidersTeam), timeoutMs);
  }

  async expectCustomerAdvocacyInsidersTeamUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.customerAdvocacyInsidersTeam), timeoutMs);
  }

  async expectCustomerAdvocacyInsidersTeamFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.customerAdvocacyInsidersTeam), timeoutMs);
  }

  async expectCustomerAdvocacyInsidersTeamCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.customerAdvocacyInsidersTeam), count, timeoutMs);
  }

  async scrollCustomerAdvocacyInsidersTeamIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.customerAdvocacyInsidersTeam));
  }

  async clickWeVePublishedOurCustomer(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.weVePublishedOurCustomer));
  }

  async doubleClickWeVePublishedOurCustomer(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.weVePublishedOurCustomer));
  }

  async longPressWeVePublishedOurCustomer(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.weVePublishedOurCustomer));
  }

  async expectWeVePublishedOurCustomerHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.weVePublishedOurCustomer), timeoutMs);
  }

  async expectWeVePublishedOurCustomerText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.weVePublishedOurCustomer), expected, timeoutMs);
  }

  async expectWeVePublishedOurCustomerContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.weVePublishedOurCustomer), substring, timeoutMs);
  }

  async expectWeVePublishedOurCustomerValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.weVePublishedOurCustomer), value, timeoutMs);
  }

  async expectWeVePublishedOurCustomerEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.weVePublishedOurCustomer), timeoutMs);
  }

  async expectWeVePublishedOurCustomerDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.weVePublishedOurCustomer), timeoutMs);
  }

  async expectWeVePublishedOurCustomerChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.weVePublishedOurCustomer), timeoutMs);
  }

  async expectWeVePublishedOurCustomerUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.weVePublishedOurCustomer), timeoutMs);
  }

  async expectWeVePublishedOurCustomerFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.weVePublishedOurCustomer), timeoutMs);
  }

  async expectWeVePublishedOurCustomerCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.weVePublishedOurCustomer), count, timeoutMs);
  }

  async scrollWeVePublishedOurCustomerIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.weVePublishedOurCustomer));
  }

  async clickWeVePublishedOur(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.weVePublishedOur));
  }

  async doubleClickWeVePublishedOur(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.weVePublishedOur));
  }

  async longPressWeVePublishedOur(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.weVePublishedOur));
  }

  async expectWeVePublishedOurHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.weVePublishedOur), timeoutMs);
  }

  async expectWeVePublishedOurText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.weVePublishedOur), expected, timeoutMs);
  }

  async expectWeVePublishedOurContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.weVePublishedOur), substring, timeoutMs);
  }

  async expectWeVePublishedOurValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.weVePublishedOur), value, timeoutMs);
  }

  async expectWeVePublishedOurEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.weVePublishedOur), timeoutMs);
  }

  async expectWeVePublishedOurDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.weVePublishedOur), timeoutMs);
  }

  async expectWeVePublishedOurChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.weVePublishedOur), timeoutMs);
  }

  async expectWeVePublishedOurUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.weVePublishedOur), timeoutMs);
  }

  async expectWeVePublishedOurFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.weVePublishedOur), timeoutMs);
  }

  async expectWeVePublishedOurCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.weVePublishedOur), count, timeoutMs);
  }

  async scrollWeVePublishedOurIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.weVePublishedOur));
  }

  async doubleClickHttpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v61ZQAQ(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v61ZQAQ));
  }

  async longPressHttpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v61ZQAQ(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v61ZQAQ));
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v61ZQAQHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v61ZQAQ), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v61ZQAQText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v61ZQAQ), expected, timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v61ZQAQContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v61ZQAQ), substring, timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v61ZQAQValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v61ZQAQ), value, timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v61ZQAQEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v61ZQAQ), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v61ZQAQDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v61ZQAQ), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v61ZQAQChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v61ZQAQ), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v61ZQAQUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v61ZQAQ), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v61ZQAQFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v61ZQAQ), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v61ZQAQCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v61ZQAQ), count, timeoutMs);
  }

  async scrollHttpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v61ZQAQIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUSiteA143t00000ClA29AAFPageA124X000007v61ZQAQ));
  }

  async clickHugeGiantThanksTo(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.hugeGiantThanksTo));
  }

  async doubleClickHugeGiantThanksTo(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.hugeGiantThanksTo));
  }

  async longPressHugeGiantThanksTo(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.hugeGiantThanksTo));
  }

  async expectHugeGiantThanksToHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.hugeGiantThanksTo), timeoutMs);
  }

  async expectHugeGiantThanksToText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.hugeGiantThanksTo), expected, timeoutMs);
  }

  async expectHugeGiantThanksToContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.hugeGiantThanksTo), substring, timeoutMs);
  }

  async expectHugeGiantThanksToValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.hugeGiantThanksTo), value, timeoutMs);
  }

  async expectHugeGiantThanksToEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.hugeGiantThanksTo), timeoutMs);
  }

  async expectHugeGiantThanksToDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.hugeGiantThanksTo), timeoutMs);
  }

  async expectHugeGiantThanksToChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.hugeGiantThanksTo), timeoutMs);
  }

  async expectHugeGiantThanksToUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.hugeGiantThanksTo), timeoutMs);
  }

  async expectHugeGiantThanksToFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.hugeGiantThanksTo), timeoutMs);
  }

  async expectHugeGiantThanksToCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.hugeGiantThanksTo), count, timeoutMs);
  }

  async scrollHugeGiantThanksToIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.hugeGiantThanksTo));
  }

  async clickHugeGiant(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.hugeGiant));
  }

  async doubleClickHugeGiant(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.hugeGiant));
  }

  async longPressHugeGiant(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.hugeGiant));
  }

  async expectHugeGiantHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.hugeGiant), timeoutMs);
  }

  async expectHugeGiantText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.hugeGiant), expected, timeoutMs);
  }

  async expectHugeGiantContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.hugeGiant), substring, timeoutMs);
  }

  async expectHugeGiantValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.hugeGiant), value, timeoutMs);
  }

  async expectHugeGiantEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.hugeGiant), timeoutMs);
  }

  async expectHugeGiantDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.hugeGiant), timeoutMs);
  }

  async expectHugeGiantChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.hugeGiant), timeoutMs);
  }

  async expectHugeGiantUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.hugeGiant), timeoutMs);
  }

  async expectHugeGiantFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.hugeGiant), timeoutMs);
  }

  async expectHugeGiantCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.hugeGiant), count, timeoutMs);
  }

  async scrollHugeGiantIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.hugeGiant));
  }

  async clickThanksToOurTop(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.thanksToOurTop));
  }

  async doubleClickThanksToOurTop(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.thanksToOurTop));
  }

  async longPressThanksToOurTop(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.thanksToOurTop));
  }

  async expectThanksToOurTopHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.thanksToOurTop), timeoutMs);
  }

  async expectThanksToOurTopText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.thanksToOurTop), expected, timeoutMs);
  }

  async expectThanksToOurTopContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.thanksToOurTop), substring, timeoutMs);
  }

  async expectThanksToOurTopValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.thanksToOurTop), value, timeoutMs);
  }

  async expectThanksToOurTopEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.thanksToOurTop), timeoutMs);
  }

  async expectThanksToOurTopDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.thanksToOurTop), timeoutMs);
  }

  async expectThanksToOurTopChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.thanksToOurTop), timeoutMs);
  }

  async expectThanksToOurTopUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.thanksToOurTop), timeoutMs);
  }

  async expectThanksToOurTopFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.thanksToOurTop), timeoutMs);
  }

  async expectThanksToOurTopCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.thanksToOurTop), count, timeoutMs);
  }

  async scrollThanksToOurTopIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.thanksToOurTop));
  }

  async clickRelationshipManagementMicheleBronder(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.relationshipManagementMicheleBronder));
  }

  async doubleClickRelationshipManagementMicheleBronder(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.relationshipManagementMicheleBronder));
  }

  async longPressRelationshipManagementMicheleBronder(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.relationshipManagementMicheleBronder));
  }

  async expectRelationshipManagementMicheleBronderHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.relationshipManagementMicheleBronder), timeoutMs);
  }

  async expectRelationshipManagementMicheleBronderText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.relationshipManagementMicheleBronder), expected, timeoutMs);
  }

  async expectRelationshipManagementMicheleBronderContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.relationshipManagementMicheleBronder), substring, timeoutMs);
  }

  async expectRelationshipManagementMicheleBronderValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.relationshipManagementMicheleBronder), value, timeoutMs);
  }

  async expectRelationshipManagementMicheleBronderEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.relationshipManagementMicheleBronder), timeoutMs);
  }

  async expectRelationshipManagementMicheleBronderDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.relationshipManagementMicheleBronder), timeoutMs);
  }

  async expectRelationshipManagementMicheleBronderChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.relationshipManagementMicheleBronder), timeoutMs);
  }

  async expectRelationshipManagementMicheleBronderUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.relationshipManagementMicheleBronder), timeoutMs);
  }

  async expectRelationshipManagementMicheleBronderFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.relationshipManagementMicheleBronder), timeoutMs);
  }

  async expectRelationshipManagementMicheleBronderCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.relationshipManagementMicheleBronder), count, timeoutMs);
  }

  async scrollRelationshipManagementMicheleBronderIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.relationshipManagementMicheleBronder));
  }

  async doubleClickHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6imAAA(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6imAAA));
  }

  async longPressHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6imAAA(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6imAAA));
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6imAAAHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6imAAA), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6imAAAText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6imAAA), expected, timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6imAAAContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6imAAA), substring, timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6imAAAValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6imAAA), value, timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6imAAAEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6imAAA), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6imAAADisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6imAAA), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6imAAAChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6imAAA), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6imAAAUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6imAAA), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6imAAAFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6imAAA), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6imAAACount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6imAAA), count, timeoutMs);
  }

  async scrollHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6imAAAIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6imAAA));
  }

  async clickElementLikeCommentShare(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.elementLikeCommentShare));
  }

  async doubleClickElementLikeCommentShare(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.elementLikeCommentShare));
  }

  async longPressElementLikeCommentShare(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.elementLikeCommentShare));
  }

  async expectElementLikeCommentShareHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.elementLikeCommentShare), timeoutMs);
  }

  async expectElementLikeCommentShareText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.elementLikeCommentShare), expected, timeoutMs);
  }

  async expectElementLikeCommentShareContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.elementLikeCommentShare), substring, timeoutMs);
  }

  async expectElementLikeCommentShareValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.elementLikeCommentShare), value, timeoutMs);
  }

  async expectElementLikeCommentShareEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.elementLikeCommentShare), timeoutMs);
  }

  async expectElementLikeCommentShareDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.elementLikeCommentShare), timeoutMs);
  }

  async expectElementLikeCommentShareChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.elementLikeCommentShare), timeoutMs);
  }

  async expectElementLikeCommentShareUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.elementLikeCommentShare), timeoutMs);
  }

  async expectElementLikeCommentShareFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.elementLikeCommentShare), timeoutMs);
  }

  async expectElementLikeCommentShareCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.elementLikeCommentShare), count, timeoutMs);
  }

  async scrollElementLikeCommentShareIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.elementLikeCommentShare));
  }

  async doubleClickHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r5zKAAQ(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r5zKAAQ));
  }

  async longPressHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r5zKAAQ(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r5zKAAQ));
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r5zKAAQHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r5zKAAQ), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r5zKAAQText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r5zKAAQ), expected, timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r5zKAAQContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r5zKAAQ), substring, timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r5zKAAQValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r5zKAAQ), value, timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r5zKAAQEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r5zKAAQ), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r5zKAAQDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r5zKAAQ), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r5zKAAQChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r5zKAAQ), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r5zKAAQUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r5zKAAQ), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r5zKAAQFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r5zKAAQ), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r5zKAAQCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r5zKAAQ), count, timeoutMs);
  }

  async scrollHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r5zKAAQIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r5zKAAQ));
  }

  async clickAnd2(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.and2));
  }

  async doubleClickAnd2(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.and2));
  }

  async longPressAnd2(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.and2));
  }

  async expectAnd2Hidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.and2), timeoutMs);
  }

  async expectAnd2Text(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.and2), expected, timeoutMs);
  }

  async expectAnd2ContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.and2), substring, timeoutMs);
  }

  async expectAnd2Value(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.and2), value, timeoutMs);
  }

  async expectAnd2Enabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.and2), timeoutMs);
  }

  async expectAnd2Disabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.and2), timeoutMs);
  }

  async expectAnd2Checked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.and2), timeoutMs);
  }

  async expectAnd2Unchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.and2), timeoutMs);
  }

  async expectAnd2Focused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.and2), timeoutMs);
  }

  async expectAnd2Count(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.and2), count, timeoutMs);
  }

  async scrollAnd2IntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.and2));
  }

  async doubleClickHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r773AAA(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r773AAA));
  }

  async longPressHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r773AAA(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r773AAA));
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r773AAAHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r773AAA), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r773AAAText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r773AAA), expected, timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r773AAAContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r773AAA), substring, timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r773AAAValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r773AAA), value, timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r773AAAEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r773AAA), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r773AAADisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r773AAA), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r773AAAChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r773AAA), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r773AAAUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r773AAA), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r773AAAFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r773AAA), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r773AAACount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r773AAA), count, timeoutMs);
  }

  async scrollHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r773AAAIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r773AAA));
  }

  async clickElement(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.element));
  }

  async doubleClickElement(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.element));
  }

  async longPressElement(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.element));
  }

  async expectElementHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.element), timeoutMs);
  }

  async expectElementText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.element), expected, timeoutMs);
  }

  async expectElementContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.element), substring, timeoutMs);
  }

  async expectElementValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.element), value, timeoutMs);
  }

  async expectElementEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.element), timeoutMs);
  }

  async expectElementDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.element), timeoutMs);
  }

  async expectElementChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.element), timeoutMs);
  }

  async expectElementUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.element), timeoutMs);
  }

  async expectElementFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.element), timeoutMs);
  }

  async expectElementCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.element), count, timeoutMs);
  }

  async scrollElementIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.element));
  }

  async clickSalesMollyBondellio13(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.salesMollyBondellio13));
  }

  async doubleClickSalesMollyBondellio13(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.salesMollyBondellio13));
  }

  async longPressSalesMollyBondellio13(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.salesMollyBondellio13));
  }

  async expectSalesMollyBondellio13Hidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.salesMollyBondellio13), timeoutMs);
  }

  async expectSalesMollyBondellio13Text(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.salesMollyBondellio13), expected, timeoutMs);
  }

  async expectSalesMollyBondellio13ContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.salesMollyBondellio13), substring, timeoutMs);
  }

  async expectSalesMollyBondellio13Value(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.salesMollyBondellio13), value, timeoutMs);
  }

  async expectSalesMollyBondellio13Enabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.salesMollyBondellio13), timeoutMs);
  }

  async expectSalesMollyBondellio13Disabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.salesMollyBondellio13), timeoutMs);
  }

  async expectSalesMollyBondellio13Checked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.salesMollyBondellio13), timeoutMs);
  }

  async expectSalesMollyBondellio13Unchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.salesMollyBondellio13), timeoutMs);
  }

  async expectSalesMollyBondellio13Focused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.salesMollyBondellio13), timeoutMs);
  }

  async expectSalesMollyBondellio13Count(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.salesMollyBondellio13), count, timeoutMs);
  }

  async scrollSalesMollyBondellio13IntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.salesMollyBondellio13));
  }

  async doubleClickHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6jYAAQ(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6jYAAQ));
  }

  async longPressHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6jYAAQ(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6jYAAQ));
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6jYAAQHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6jYAAQ), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6jYAAQText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6jYAAQ), expected, timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6jYAAQContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6jYAAQ), substring, timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6jYAAQValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6jYAAQ), value, timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6jYAAQEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6jYAAQ), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6jYAAQDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6jYAAQ), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6jYAAQChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6jYAAQ), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6jYAAQUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6jYAAQ), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6jYAAQFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6jYAAQ), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6jYAAQCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6jYAAQ), count, timeoutMs);
  }

  async scrollHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6jYAAQIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r6jYAAQ));
  }

  async clickElement2(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.element2));
  }

  async doubleClickElement2(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.element2));
  }

  async longPressElement2(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.element2));
  }

  async expectElement2Hidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.element2), timeoutMs);
  }

  async expectElement2Text(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.element2), expected, timeoutMs);
  }

  async expectElement2ContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.element2), substring, timeoutMs);
  }

  async expectElement2Value(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.element2), value, timeoutMs);
  }

  async expectElement2Enabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.element2), timeoutMs);
  }

  async expectElement2Disabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.element2), timeoutMs);
  }

  async expectElement2Checked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.element2), timeoutMs);
  }

  async expectElement2Unchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.element2), timeoutMs);
  }

  async expectElement2Focused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.element2), timeoutMs);
  }

  async expectElement2Count(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.element2), count, timeoutMs);
  }

  async scrollElement2IntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.element2));
  }

  async doubleClickHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r66fAAA(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r66fAAA));
  }

  async longPressHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r66fAAA(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r66fAAA));
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r66fAAAHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r66fAAA), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r66fAAAText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r66fAAA), expected, timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r66fAAAContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r66fAAA), substring, timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r66fAAAValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r66fAAA), value, timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r66fAAAEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r66fAAA), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r66fAAADisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r66fAAA), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r66fAAAChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r66fAAA), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r66fAAAUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r66fAAA), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r66fAAAFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r66fAAA), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r66fAAACount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r66fAAA), count, timeoutMs);
  }

  async scrollHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r66fAAAIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r66fAAA));
  }

  async clickAnd3(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.and3));
  }

  async doubleClickAnd3(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.and3));
  }

  async longPressAnd3(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.and3));
  }

  async expectAnd3Hidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.and3), timeoutMs);
  }

  async expectAnd3Text(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.and3), expected, timeoutMs);
  }

  async expectAnd3ContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.and3), substring, timeoutMs);
  }

  async expectAnd3Value(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.and3), value, timeoutMs);
  }

  async expectAnd3Enabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.and3), timeoutMs);
  }

  async expectAnd3Disabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.and3), timeoutMs);
  }

  async expectAnd3Checked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.and3), timeoutMs);
  }

  async expectAnd3Unchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.and3), timeoutMs);
  }

  async expectAnd3Focused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.and3), timeoutMs);
  }

  async expectAnd3Count(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.and3), count, timeoutMs);
  }

  async scrollAnd3IntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.and3));
  }

  async doubleClickHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4oNAAQ(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4oNAAQ));
  }

  async longPressHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4oNAAQ(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4oNAAQ));
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4oNAAQHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4oNAAQ), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4oNAAQText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4oNAAQ), expected, timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4oNAAQContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4oNAAQ), substring, timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4oNAAQValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4oNAAQ), value, timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4oNAAQEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4oNAAQ), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4oNAAQDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4oNAAQ), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4oNAAQChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4oNAAQ), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4oNAAQUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4oNAAQ), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4oNAAQFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4oNAAQ), timeoutMs);
  }

  async expectHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4oNAAQCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4oNAAQ), count, timeoutMs);
  }

  async scrollHttpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4oNAAQIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.httpsUkgSimpplrVisualforceComApexSimpplrAppUPeopleA0w3t000006r4oNAAQ));
  }

  async clickElement3(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.element3));
  }

  async doubleClickElement3(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.element3));
  }

  async longPressElement3(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.element3));
  }

  async expectElement3Hidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.element3), timeoutMs);
  }

  async expectElement3Text(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.element3), expected, timeoutMs);
  }

  async expectElement3ContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.element3), substring, timeoutMs);
  }

  async expectElement3Value(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.element3), value, timeoutMs);
  }

  async expectElement3Enabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.element3), timeoutMs);
  }

  async expectElement3Disabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.element3), timeoutMs);
  }

  async expectElement3Checked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.element3), timeoutMs);
  }

  async expectElement3Unchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.element3), timeoutMs);
  }

  async expectElement3Focused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.element3), timeoutMs);
  }

  async expectElement3Count(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.element3), count, timeoutMs);
  }

  async scrollElement3IntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.element3));
  }

  async clickHighlightsFromTheQuarter(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.highlightsFromTheQuarter));
  }

  async doubleClickHighlightsFromTheQuarter(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.highlightsFromTheQuarter));
  }

  async longPressHighlightsFromTheQuarter(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.highlightsFromTheQuarter));
  }

  async expectHighlightsFromTheQuarterHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.highlightsFromTheQuarter), timeoutMs);
  }

  async expectHighlightsFromTheQuarterText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.highlightsFromTheQuarter), expected, timeoutMs);
  }

  async expectHighlightsFromTheQuarterContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.highlightsFromTheQuarter), substring, timeoutMs);
  }

  async expectHighlightsFromTheQuarterValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.highlightsFromTheQuarter), value, timeoutMs);
  }

  async expectHighlightsFromTheQuarterEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.highlightsFromTheQuarter), timeoutMs);
  }

  async expectHighlightsFromTheQuarterDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.highlightsFromTheQuarter), timeoutMs);
  }

  async expectHighlightsFromTheQuarterChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.highlightsFromTheQuarter), timeoutMs);
  }

  async expectHighlightsFromTheQuarterUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.highlightsFromTheQuarter), timeoutMs);
  }

  async expectHighlightsFromTheQuarterFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.highlightsFromTheQuarter), timeoutMs);
  }

  async expectHighlightsFromTheQuarterCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.highlightsFromTheQuarter), count, timeoutMs);
  }

  async scrollHighlightsFromTheQuarterIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.highlightsFromTheQuarter));
  }

  async clickAdvocacyInfluencedBookings333MArr(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.advocacyInfluencedBookings333MArr));
  }

  async doubleClickAdvocacyInfluencedBookings333MArr(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.advocacyInfluencedBookings333MArr));
  }

  async longPressAdvocacyInfluencedBookings333MArr(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.advocacyInfluencedBookings333MArr));
  }

  async expectAdvocacyInfluencedBookings333MArrHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.advocacyInfluencedBookings333MArr), timeoutMs);
  }

  async expectAdvocacyInfluencedBookings333MArrText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.advocacyInfluencedBookings333MArr), expected, timeoutMs);
  }

  async expectAdvocacyInfluencedBookings333MArrContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.advocacyInfluencedBookings333MArr), substring, timeoutMs);
  }

  async expectAdvocacyInfluencedBookings333MArrValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.advocacyInfluencedBookings333MArr), value, timeoutMs);
  }

  async expectAdvocacyInfluencedBookings333MArrEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.advocacyInfluencedBookings333MArr), timeoutMs);
  }

  async expectAdvocacyInfluencedBookings333MArrDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.advocacyInfluencedBookings333MArr), timeoutMs);
  }

  async expectAdvocacyInfluencedBookings333MArrChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.advocacyInfluencedBookings333MArr), timeoutMs);
  }

  async expectAdvocacyInfluencedBookings333MArrUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.advocacyInfluencedBookings333MArr), timeoutMs);
  }

  async expectAdvocacyInfluencedBookings333MArrFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.advocacyInfluencedBookings333MArr), timeoutMs);
  }

  async expectAdvocacyInfluencedBookings333MArrCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.advocacyInfluencedBookings333MArr), count, timeoutMs);
  }

  async scrollAdvocacyInfluencedBookings333MArrIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.advocacyInfluencedBookings333MArr));
  }

  async clickWeEngaged248Insiders(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.weEngaged248Insiders));
  }

  async doubleClickWeEngaged248Insiders(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.weEngaged248Insiders));
  }

  async longPressWeEngaged248Insiders(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.weEngaged248Insiders));
  }

  async expectWeEngaged248InsidersHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.weEngaged248Insiders), timeoutMs);
  }

  async expectWeEngaged248InsidersText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.weEngaged248Insiders), expected, timeoutMs);
  }

  async expectWeEngaged248InsidersContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.weEngaged248Insiders), substring, timeoutMs);
  }

  async expectWeEngaged248InsidersValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.weEngaged248Insiders), value, timeoutMs);
  }

  async expectWeEngaged248InsidersEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.weEngaged248Insiders), timeoutMs);
  }

  async expectWeEngaged248InsidersDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.weEngaged248Insiders), timeoutMs);
  }

  async expectWeEngaged248InsidersChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.weEngaged248Insiders), timeoutMs);
  }

  async expectWeEngaged248InsidersUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.weEngaged248Insiders), timeoutMs);
  }

  async expectWeEngaged248InsidersFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.weEngaged248Insiders), timeoutMs);
  }

  async expectWeEngaged248InsidersCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.weEngaged248Insiders), count, timeoutMs);
  }

  async scrollWeEngaged248InsidersIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.weEngaged248Insiders));
  }

  async clickWeSent531Insider(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.weSent531Insider));
  }

  async doubleClickWeSent531Insider(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.weSent531Insider));
  }

  async longPressWeSent531Insider(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.weSent531Insider));
  }

  async expectWeSent531InsiderHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.weSent531Insider), timeoutMs);
  }

  async expectWeSent531InsiderText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.weSent531Insider), expected, timeoutMs);
  }

  async expectWeSent531InsiderContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.weSent531Insider), substring, timeoutMs);
  }

  async expectWeSent531InsiderValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.weSent531Insider), value, timeoutMs);
  }

  async expectWeSent531InsiderEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.weSent531Insider), timeoutMs);
  }

  async expectWeSent531InsiderDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.weSent531Insider), timeoutMs);
  }

  async expectWeSent531InsiderChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.weSent531Insider), timeoutMs);
  }

  async expectWeSent531InsiderUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.weSent531Insider), timeoutMs);
  }

  async expectWeSent531InsiderFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.weSent531Insider), timeoutMs);
  }

  async expectWeSent531InsiderCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.weSent531Insider), count, timeoutMs);
  }

  async scrollWeSent531InsiderIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.weSent531Insider));
  }

  async clickInsidersParticipatedInMarketing(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.insidersParticipatedInMarketing));
  }

  async doubleClickInsidersParticipatedInMarketing(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.insidersParticipatedInMarketing));
  }

  async longPressInsidersParticipatedInMarketing(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.insidersParticipatedInMarketing));
  }

  async expectInsidersParticipatedInMarketingHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.insidersParticipatedInMarketing), timeoutMs);
  }

  async expectInsidersParticipatedInMarketingText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.insidersParticipatedInMarketing), expected, timeoutMs);
  }

  async expectInsidersParticipatedInMarketingContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.insidersParticipatedInMarketing), substring, timeoutMs);
  }

  async expectInsidersParticipatedInMarketingValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.insidersParticipatedInMarketing), value, timeoutMs);
  }

  async expectInsidersParticipatedInMarketingEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.insidersParticipatedInMarketing), timeoutMs);
  }

  async expectInsidersParticipatedInMarketingDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.insidersParticipatedInMarketing), timeoutMs);
  }

  async expectInsidersParticipatedInMarketingChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.insidersParticipatedInMarketing), timeoutMs);
  }

  async expectInsidersParticipatedInMarketingUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.insidersParticipatedInMarketing), timeoutMs);
  }

  async expectInsidersParticipatedInMarketingFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.insidersParticipatedInMarketing), timeoutMs);
  }

  async expectInsidersParticipatedInMarketingCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.insidersParticipatedInMarketing), count, timeoutMs);
  }

  async scrollInsidersParticipatedInMarketingIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.insidersParticipatedInMarketing));
  }

  async clickInsidersParticipatedIn288(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.insidersParticipatedIn288));
  }

  async doubleClickInsidersParticipatedIn288(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.insidersParticipatedIn288));
  }

  async longPressInsidersParticipatedIn288(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.insidersParticipatedIn288));
  }

  async expectInsidersParticipatedIn288Hidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.insidersParticipatedIn288), timeoutMs);
  }

  async expectInsidersParticipatedIn288Text(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.insidersParticipatedIn288), expected, timeoutMs);
  }

  async expectInsidersParticipatedIn288ContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.insidersParticipatedIn288), substring, timeoutMs);
  }

  async expectInsidersParticipatedIn288Value(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.insidersParticipatedIn288), value, timeoutMs);
  }

  async expectInsidersParticipatedIn288Enabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.insidersParticipatedIn288), timeoutMs);
  }

  async expectInsidersParticipatedIn288Disabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.insidersParticipatedIn288), timeoutMs);
  }

  async expectInsidersParticipatedIn288Checked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.insidersParticipatedIn288), timeoutMs);
  }

  async expectInsidersParticipatedIn288Unchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.insidersParticipatedIn288), timeoutMs);
  }

  async expectInsidersParticipatedIn288Focused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.insidersParticipatedIn288), timeoutMs);
  }

  async expectInsidersParticipatedIn288Count(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.insidersParticipatedIn288), count, timeoutMs);
  }

  async scrollInsidersParticipatedIn288IntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.insidersParticipatedIn288));
  }

  async clickAllThingsSalesArchived(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.allThingsSalesArchived));
  }

  async doubleClickAllThingsSalesArchived(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.allThingsSalesArchived));
  }

  async longPressAllThingsSalesArchived(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.allThingsSalesArchived));
  }

  async expectAllThingsSalesArchivedHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.allThingsSalesArchived), timeoutMs);
  }

  async expectAllThingsSalesArchivedText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.allThingsSalesArchived), expected, timeoutMs);
  }

  async expectAllThingsSalesArchivedContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.allThingsSalesArchived), substring, timeoutMs);
  }

  async expectAllThingsSalesArchivedValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.allThingsSalesArchived), value, timeoutMs);
  }

  async expectAllThingsSalesArchivedEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.allThingsSalesArchived), timeoutMs);
  }

  async expectAllThingsSalesArchivedDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.allThingsSalesArchived), timeoutMs);
  }

  async expectAllThingsSalesArchivedChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.allThingsSalesArchived), timeoutMs);
  }

  async expectAllThingsSalesArchivedUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.allThingsSalesArchived), timeoutMs);
  }

  async expectAllThingsSalesArchivedFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.allThingsSalesArchived), timeoutMs);
  }

  async expectAllThingsSalesArchivedCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.allThingsSalesArchived), count, timeoutMs);
  }

  async scrollAllThingsSalesArchivedIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.allThingsSalesArchived));
  }

  async doubleClickCommentsLikeCommentShare(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.commentsLikeCommentShare));
  }

  async longPressCommentsLikeCommentShare(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.commentsLikeCommentShare));
  }

  async expectCommentsLikeCommentShareHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.commentsLikeCommentShare), timeoutMs);
  }

  async expectCommentsLikeCommentShareText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.commentsLikeCommentShare), expected, timeoutMs);
  }

  async expectCommentsLikeCommentShareContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.commentsLikeCommentShare), substring, timeoutMs);
  }

  async expectCommentsLikeCommentShareValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.commentsLikeCommentShare), value, timeoutMs);
  }

  async expectCommentsLikeCommentShareEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.commentsLikeCommentShare), timeoutMs);
  }

  async expectCommentsLikeCommentShareDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.commentsLikeCommentShare), timeoutMs);
  }

  async expectCommentsLikeCommentShareChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.commentsLikeCommentShare), timeoutMs);
  }

  async expectCommentsLikeCommentShareUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.commentsLikeCommentShare), timeoutMs);
  }

  async expectCommentsLikeCommentShareFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.commentsLikeCommentShare), timeoutMs);
  }

  async expectCommentsLikeCommentShareCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.commentsLikeCommentShare), count, timeoutMs);
  }

  async scrollCommentsLikeCommentShareIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.commentsLikeCommentShare));
  }

  async doubleClickSeenBy34LikeCommentShare(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.seenBy34LikeCommentShare));
  }

  async longPressSeenBy34LikeCommentShare(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.seenBy34LikeCommentShare));
  }

  async expectSeenBy34LikeCommentShareHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.seenBy34LikeCommentShare), timeoutMs);
  }

  async expectSeenBy34LikeCommentShareText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.seenBy34LikeCommentShare), expected, timeoutMs);
  }

  async expectSeenBy34LikeCommentShareContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.seenBy34LikeCommentShare), substring, timeoutMs);
  }

  async expectSeenBy34LikeCommentShareValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.seenBy34LikeCommentShare), value, timeoutMs);
  }

  async expectSeenBy34LikeCommentShareEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.seenBy34LikeCommentShare), timeoutMs);
  }

  async expectSeenBy34LikeCommentShareDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.seenBy34LikeCommentShare), timeoutMs);
  }

  async expectSeenBy34LikeCommentShareChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.seenBy34LikeCommentShare), timeoutMs);
  }

  async expectSeenBy34LikeCommentShareUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.seenBy34LikeCommentShare), timeoutMs);
  }

  async expectSeenBy34LikeCommentShareFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.seenBy34LikeCommentShare), timeoutMs);
  }

  async expectSeenBy34LikeCommentShareCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.seenBy34LikeCommentShare), count, timeoutMs);
  }

  async scrollSeenBy34LikeCommentShareIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.seenBy34LikeCommentShare));
  }

  async longPressMoreCommentsLikeCommentShare(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.moreCommentsLikeCommentShare));
  }

  async expectMoreCommentsLikeCommentShareHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.moreCommentsLikeCommentShare), timeoutMs);
  }

  async expectMoreCommentsLikeCommentShareText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.moreCommentsLikeCommentShare), expected, timeoutMs);
  }

  async expectMoreCommentsLikeCommentShareContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.moreCommentsLikeCommentShare), substring, timeoutMs);
  }

  async expectMoreCommentsLikeCommentShareValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.moreCommentsLikeCommentShare), value, timeoutMs);
  }

  async expectMoreCommentsLikeCommentShareEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.moreCommentsLikeCommentShare), timeoutMs);
  }

  async expectMoreCommentsLikeCommentShareDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.moreCommentsLikeCommentShare), timeoutMs);
  }

  async expectMoreCommentsLikeCommentShareChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.moreCommentsLikeCommentShare), timeoutMs);
  }

  async expectMoreCommentsLikeCommentShareUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.moreCommentsLikeCommentShare), timeoutMs);
  }

  async expectMoreCommentsLikeCommentShareFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.moreCommentsLikeCommentShare), timeoutMs);
  }

  async expectMoreCommentsLikeCommentShareCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.moreCommentsLikeCommentShare), count, timeoutMs);
  }

  async scrollMoreCommentsLikeCommentShareIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.moreCommentsLikeCommentShare));
  }

  async clickNancyBauma4Years(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.nancyBauma4Years));
  }

  async doubleClickNancyBauma4Years(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.nancyBauma4Years));
  }

  async longPressNancyBauma4Years(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.nancyBauma4Years));
  }

  async expectNancyBauma4YearsHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.nancyBauma4Years), timeoutMs);
  }

  async expectNancyBauma4YearsText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.nancyBauma4Years), expected, timeoutMs);
  }

  async expectNancyBauma4YearsContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.nancyBauma4Years), substring, timeoutMs);
  }

  async expectNancyBauma4YearsValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.nancyBauma4Years), value, timeoutMs);
  }

  async expectNancyBauma4YearsEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.nancyBauma4Years), timeoutMs);
  }

  async expectNancyBauma4YearsDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.nancyBauma4Years), timeoutMs);
  }

  async expectNancyBauma4YearsChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.nancyBauma4Years), timeoutMs);
  }

  async expectNancyBauma4YearsUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.nancyBauma4Years), timeoutMs);
  }

  async expectNancyBauma4YearsFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.nancyBauma4Years), timeoutMs);
  }

  async expectNancyBauma4YearsCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.nancyBauma4Years), count, timeoutMs);
  }

  async scrollNancyBauma4YearsIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.nancyBauma4Years));
  }

  async clickStephenCahillHeyCool(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.stephenCahillHeyCool));
  }

  async doubleClickStephenCahillHeyCool(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.stephenCahillHeyCool));
  }

  async longPressStephenCahillHeyCool(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.stephenCahillHeyCool));
  }

  async expectStephenCahillHeyCoolHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.stephenCahillHeyCool), timeoutMs);
  }

  async expectStephenCahillHeyCoolText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.stephenCahillHeyCool), expected, timeoutMs);
  }

  async expectStephenCahillHeyCoolContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.stephenCahillHeyCool), substring, timeoutMs);
  }

  async expectStephenCahillHeyCoolValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.stephenCahillHeyCool), value, timeoutMs);
  }

  async expectStephenCahillHeyCoolEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.stephenCahillHeyCool), timeoutMs);
  }

  async expectStephenCahillHeyCoolDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.stephenCahillHeyCool), timeoutMs);
  }

  async expectStephenCahillHeyCoolChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.stephenCahillHeyCool), timeoutMs);
  }

  async expectStephenCahillHeyCoolUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.stephenCahillHeyCool), timeoutMs);
  }

  async expectStephenCahillHeyCoolFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.stephenCahillHeyCool), timeoutMs);
  }

  async expectStephenCahillHeyCoolCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.stephenCahillHeyCool), count, timeoutMs);
  }

  async scrollStephenCahillHeyCoolIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.stephenCahillHeyCool));
  }

  async doubleClickStephenCahill(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.stephenCahill));
  }

  async longPressStephenCahill(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.stephenCahill));
  }

  async expectStephenCahillHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.stephenCahill), timeoutMs);
  }

  async expectStephenCahillText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.stephenCahill), expected, timeoutMs);
  }

  async expectStephenCahillContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.stephenCahill), substring, timeoutMs);
  }

  async expectStephenCahillValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.stephenCahill), value, timeoutMs);
  }

  async expectStephenCahillEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.stephenCahill), timeoutMs);
  }

  async expectStephenCahillDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.stephenCahill), timeoutMs);
  }

  async expectStephenCahillChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.stephenCahill), timeoutMs);
  }

  async expectStephenCahillUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.stephenCahill), timeoutMs);
  }

  async expectStephenCahillFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.stephenCahill), timeoutMs);
  }

  async expectStephenCahillCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.stephenCahill), count, timeoutMs);
  }

  async scrollStephenCahillIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.stephenCahill));
  }

  async clickHeyCoolThanks(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.heyCoolThanks));
  }

  async doubleClickHeyCoolThanks(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.heyCoolThanks));
  }

  async longPressHeyCoolThanks(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.heyCoolThanks));
  }

  async expectHeyCoolThanksHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.heyCoolThanks), timeoutMs);
  }

  async expectHeyCoolThanksText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.heyCoolThanks), expected, timeoutMs);
  }

  async expectHeyCoolThanksContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.heyCoolThanks), substring, timeoutMs);
  }

  async expectHeyCoolThanksValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.heyCoolThanks), value, timeoutMs);
  }

  async expectHeyCoolThanksEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.heyCoolThanks), timeoutMs);
  }

  async expectHeyCoolThanksDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.heyCoolThanks), timeoutMs);
  }

  async expectHeyCoolThanksChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.heyCoolThanks), timeoutMs);
  }

  async expectHeyCoolThanksUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.heyCoolThanks), timeoutMs);
  }

  async expectHeyCoolThanksFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.heyCoolThanks), timeoutMs);
  }

  async expectHeyCoolThanksCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.heyCoolThanks), count, timeoutMs);
  }

  async scrollHeyCoolThanksIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.heyCoolThanks));
  }

  async clickLawrenceScofieldLikeComment(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.lawrenceScofieldLikeComment));
  }

  async doubleClickLawrenceScofieldLikeComment(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.lawrenceScofieldLikeComment));
  }

  async longPressLawrenceScofieldLikeComment(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.lawrenceScofieldLikeComment));
  }

  async expectLawrenceScofieldLikeCommentHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.lawrenceScofieldLikeComment), timeoutMs);
  }

  async expectLawrenceScofieldLikeCommentText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.lawrenceScofieldLikeComment), expected, timeoutMs);
  }

  async expectLawrenceScofieldLikeCommentContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.lawrenceScofieldLikeComment), substring, timeoutMs);
  }

  async expectLawrenceScofieldLikeCommentValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.lawrenceScofieldLikeComment), value, timeoutMs);
  }

  async expectLawrenceScofieldLikeCommentEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.lawrenceScofieldLikeComment), timeoutMs);
  }

  async expectLawrenceScofieldLikeCommentDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.lawrenceScofieldLikeComment), timeoutMs);
  }

  async expectLawrenceScofieldLikeCommentChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.lawrenceScofieldLikeComment), timeoutMs);
  }

  async expectLawrenceScofieldLikeCommentUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.lawrenceScofieldLikeComment), timeoutMs);
  }

  async expectLawrenceScofieldLikeCommentFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.lawrenceScofieldLikeComment), timeoutMs);
  }

  async expectLawrenceScofieldLikeCommentCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.lawrenceScofieldLikeComment), count, timeoutMs);
  }

  async scrollLawrenceScofieldLikeCommentIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.lawrenceScofieldLikeComment));
  }

  async doubleClickLawrenceScofieldLikeComment2(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.lawrenceScofieldLikeComment2));
  }

  async longPressLawrenceScofieldLikeComment2(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.lawrenceScofieldLikeComment2));
  }

  async expectLawrenceScofieldLikeComment2Hidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.lawrenceScofieldLikeComment2), timeoutMs);
  }

  async expectLawrenceScofieldLikeComment2Text(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.lawrenceScofieldLikeComment2), expected, timeoutMs);
  }

  async expectLawrenceScofieldLikeComment2ContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.lawrenceScofieldLikeComment2), substring, timeoutMs);
  }

  async expectLawrenceScofieldLikeComment2Value(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.lawrenceScofieldLikeComment2), value, timeoutMs);
  }

  async expectLawrenceScofieldLikeComment2Enabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.lawrenceScofieldLikeComment2), timeoutMs);
  }

  async expectLawrenceScofieldLikeComment2Disabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.lawrenceScofieldLikeComment2), timeoutMs);
  }

  async expectLawrenceScofieldLikeComment2Checked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.lawrenceScofieldLikeComment2), timeoutMs);
  }

  async expectLawrenceScofieldLikeComment2Unchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.lawrenceScofieldLikeComment2), timeoutMs);
  }

  async expectLawrenceScofieldLikeComment2Focused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.lawrenceScofieldLikeComment2), timeoutMs);
  }

  async expectLawrenceScofieldLikeComment2Count(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.lawrenceScofieldLikeComment2), count, timeoutMs);
  }

  async scrollLawrenceScofieldLikeComment2IntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.lawrenceScofieldLikeComment2));
  }

  async clickExceptionalCustomerExperienceCx3(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCx3));
  }

  async doubleClickExceptionalCustomerExperienceCx3(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCx3));
  }

  async longPressExceptionalCustomerExperienceCx3(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCx3));
  }

  async expectExceptionalCustomerExperienceCx3Hidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCx3), timeoutMs);
  }

  async expectExceptionalCustomerExperienceCx3Text(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCx3), expected, timeoutMs);
  }

  async expectExceptionalCustomerExperienceCx3ContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCx3), substring, timeoutMs);
  }

  async expectExceptionalCustomerExperienceCx3Value(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCx3), value, timeoutMs);
  }

  async expectExceptionalCustomerExperienceCx3Enabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCx3), timeoutMs);
  }

  async expectExceptionalCustomerExperienceCx3Disabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCx3), timeoutMs);
  }

  async expectExceptionalCustomerExperienceCx3Checked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCx3), timeoutMs);
  }

  async expectExceptionalCustomerExperienceCx3Unchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCx3), timeoutMs);
  }

  async expectExceptionalCustomerExperienceCx3Focused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCx3), timeoutMs);
  }

  async expectExceptionalCustomerExperienceCx3Count(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCx3), count, timeoutMs);
  }

  async scrollExceptionalCustomerExperienceCx3IntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCx3));
  }

  async clickIsThereAWayLikeComment(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.isThereAWayLikeComment));
  }

  async doubleClickIsThereAWayLikeComment(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.isThereAWayLikeComment));
  }

  async longPressIsThereAWayLikeComment(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.isThereAWayLikeComment));
  }

  async expectIsThereAWayLikeCommentHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.isThereAWayLikeComment), timeoutMs);
  }

  async expectIsThereAWayLikeCommentText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.isThereAWayLikeComment), expected, timeoutMs);
  }

  async expectIsThereAWayLikeCommentContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.isThereAWayLikeComment), substring, timeoutMs);
  }

  async expectIsThereAWayLikeCommentValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.isThereAWayLikeComment), value, timeoutMs);
  }

  async expectIsThereAWayLikeCommentEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.isThereAWayLikeComment), timeoutMs);
  }

  async expectIsThereAWayLikeCommentDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.isThereAWayLikeComment), timeoutMs);
  }

  async expectIsThereAWayLikeCommentChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.isThereAWayLikeComment), timeoutMs);
  }

  async expectIsThereAWayLikeCommentUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.isThereAWayLikeComment), timeoutMs);
  }

  async expectIsThereAWayLikeCommentFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.isThereAWayLikeComment), timeoutMs);
  }

  async expectIsThereAWayLikeCommentCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.isThereAWayLikeComment), count, timeoutMs);
  }

  async scrollIsThereAWayLikeCommentIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.isThereAWayLikeComment));
  }

  async clickIsThereAWay(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.isThereAWay));
  }

  async doubleClickIsThereAWay(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.isThereAWay));
  }

  async longPressIsThereAWay(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.isThereAWay));
  }

  async expectIsThereAWayHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.isThereAWay), timeoutMs);
  }

  async expectIsThereAWayText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.isThereAWay), expected, timeoutMs);
  }

  async expectIsThereAWayContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.isThereAWay), substring, timeoutMs);
  }

  async expectIsThereAWayValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.isThereAWay), value, timeoutMs);
  }

  async expectIsThereAWayEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.isThereAWay), timeoutMs);
  }

  async expectIsThereAWayDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.isThereAWay), timeoutMs);
  }

  async expectIsThereAWayChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.isThereAWay), timeoutMs);
  }

  async expectIsThereAWayUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.isThereAWay), timeoutMs);
  }

  async expectIsThereAWayFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.isThereAWay), timeoutMs);
  }

  async expectIsThereAWayCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.isThereAWay), count, timeoutMs);
  }

  async scrollIsThereAWayIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.isThereAWay));
  }

  async doubleClickHttpsKronosLightningForceComLightningR0036100001MjGXmAANView(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.httpsKronosLightningForceComLightningR0036100001MjGXmAANView));
  }

  async longPressHttpsKronosLightningForceComLightningR0036100001MjGXmAANView(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.httpsKronosLightningForceComLightningR0036100001MjGXmAANView));
  }

  async expectHttpsKronosLightningForceComLightningR0036100001MjGXmAANViewHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.httpsKronosLightningForceComLightningR0036100001MjGXmAANView), timeoutMs);
  }

  async expectHttpsKronosLightningForceComLightningR0036100001MjGXmAANViewText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.httpsKronosLightningForceComLightningR0036100001MjGXmAANView), expected, timeoutMs);
  }

  async expectHttpsKronosLightningForceComLightningR0036100001MjGXmAANViewContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.httpsKronosLightningForceComLightningR0036100001MjGXmAANView), substring, timeoutMs);
  }

  async expectHttpsKronosLightningForceComLightningR0036100001MjGXmAANViewValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.httpsKronosLightningForceComLightningR0036100001MjGXmAANView), value, timeoutMs);
  }

  async expectHttpsKronosLightningForceComLightningR0036100001MjGXmAANViewEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.httpsKronosLightningForceComLightningR0036100001MjGXmAANView), timeoutMs);
  }

  async expectHttpsKronosLightningForceComLightningR0036100001MjGXmAANViewDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.httpsKronosLightningForceComLightningR0036100001MjGXmAANView), timeoutMs);
  }

  async expectHttpsKronosLightningForceComLightningR0036100001MjGXmAANViewChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.httpsKronosLightningForceComLightningR0036100001MjGXmAANView), timeoutMs);
  }

  async expectHttpsKronosLightningForceComLightningR0036100001MjGXmAANViewUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.httpsKronosLightningForceComLightningR0036100001MjGXmAANView), timeoutMs);
  }

  async expectHttpsKronosLightningForceComLightningR0036100001MjGXmAANViewFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.httpsKronosLightningForceComLightningR0036100001MjGXmAANView), timeoutMs);
  }

  async expectHttpsKronosLightningForceComLightningR0036100001MjGXmAANViewCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.httpsKronosLightningForceComLightningR0036100001MjGXmAANView), count, timeoutMs);
  }

  async scrollHttpsKronosLightningForceComLightningR0036100001MjGXmAANViewIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.httpsKronosLightningForceComLightningR0036100001MjGXmAANView));
  }

  async clickSftpAccountRequest(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.sftpAccountRequest));
  }

  async doubleClickSftpAccountRequest(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.sftpAccountRequest));
  }

  async longPressSftpAccountRequest(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.sftpAccountRequest));
  }

  async expectSftpAccountRequestHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.sftpAccountRequest), timeoutMs);
  }

  async expectSftpAccountRequestText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.sftpAccountRequest), expected, timeoutMs);
  }

  async expectSftpAccountRequestContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.sftpAccountRequest), substring, timeoutMs);
  }

  async expectSftpAccountRequestValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.sftpAccountRequest), value, timeoutMs);
  }

  async expectSftpAccountRequestEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.sftpAccountRequest), timeoutMs);
  }

  async expectSftpAccountRequestDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.sftpAccountRequest), timeoutMs);
  }

  async expectSftpAccountRequestChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.sftpAccountRequest), timeoutMs);
  }

  async expectSftpAccountRequestUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.sftpAccountRequest), timeoutMs);
  }

  async expectSftpAccountRequestFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.sftpAccountRequest), timeoutMs);
  }

  async expectSftpAccountRequestCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.sftpAccountRequest), count, timeoutMs);
  }

  async scrollSftpAccountRequestIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.sftpAccountRequest));
  }

  async clickThankYouLikeComment(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.thankYouLikeComment));
  }

  async doubleClickThankYouLikeComment(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.thankYouLikeComment));
  }

  async longPressThankYouLikeComment(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.thankYouLikeComment));
  }

  async expectThankYouLikeCommentHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.thankYouLikeComment), timeoutMs);
  }

  async expectThankYouLikeCommentText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.thankYouLikeComment), expected, timeoutMs);
  }

  async expectThankYouLikeCommentContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.thankYouLikeComment), substring, timeoutMs);
  }

  async expectThankYouLikeCommentValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.thankYouLikeComment), value, timeoutMs);
  }

  async expectThankYouLikeCommentEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.thankYouLikeComment), timeoutMs);
  }

  async expectThankYouLikeCommentDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.thankYouLikeComment), timeoutMs);
  }

  async expectThankYouLikeCommentChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.thankYouLikeComment), timeoutMs);
  }

  async expectThankYouLikeCommentUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.thankYouLikeComment), timeoutMs);
  }

  async expectThankYouLikeCommentFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.thankYouLikeComment), timeoutMs);
  }

  async expectThankYouLikeCommentCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.thankYouLikeComment), count, timeoutMs);
  }

  async scrollThankYouLikeCommentIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.thankYouLikeComment));
  }

  async clickLarry(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.larry));
  }

  async doubleClickLarry(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.larry));
  }

  async longPressLarry(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.larry));
  }

  async expectLarryHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.larry), timeoutMs);
  }

  async expectLarryText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.larry), expected, timeoutMs);
  }

  async expectLarryContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.larry), substring, timeoutMs);
  }

  async expectLarryValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.larry), value, timeoutMs);
  }

  async expectLarryEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.larry), timeoutMs);
  }

  async expectLarryDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.larry), timeoutMs);
  }

  async expectLarryChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.larry), timeoutMs);
  }

  async expectLarryUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.larry), timeoutMs);
  }

  async expectLarryFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.larry), timeoutMs);
  }

  async expectLarryCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.larry), count, timeoutMs);
  }

  async scrollLarryIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.larry));
  }

  async doubleClickSeenBy32LikeComment(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.seenBy32LikeComment));
  }

  async longPressSeenBy32LikeComment(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.seenBy32LikeComment));
  }

  async expectSeenBy32LikeCommentHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.seenBy32LikeComment), timeoutMs);
  }

  async expectSeenBy32LikeCommentText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.seenBy32LikeComment), expected, timeoutMs);
  }

  async expectSeenBy32LikeCommentContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.seenBy32LikeComment), substring, timeoutMs);
  }

  async expectSeenBy32LikeCommentValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.seenBy32LikeComment), value, timeoutMs);
  }

  async expectSeenBy32LikeCommentEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.seenBy32LikeComment), timeoutMs);
  }

  async expectSeenBy32LikeCommentDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.seenBy32LikeComment), timeoutMs);
  }

  async expectSeenBy32LikeCommentChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.seenBy32LikeComment), timeoutMs);
  }

  async expectSeenBy32LikeCommentUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.seenBy32LikeComment), timeoutMs);
  }

  async expectSeenBy32LikeCommentFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.seenBy32LikeComment), timeoutMs);
  }

  async expectSeenBy32LikeCommentCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.seenBy32LikeComment), count, timeoutMs);
  }

  async scrollSeenBy32LikeCommentIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.seenBy32LikeComment));
  }

  async doubleClickSusanCharestLikeComment(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.susanCharestLikeComment));
  }

  async longPressSusanCharestLikeComment(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.susanCharestLikeComment));
  }

  async expectSusanCharestLikeCommentHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.susanCharestLikeComment), timeoutMs);
  }

  async expectSusanCharestLikeCommentText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.susanCharestLikeComment), expected, timeoutMs);
  }

  async expectSusanCharestLikeCommentContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.susanCharestLikeComment), substring, timeoutMs);
  }

  async expectSusanCharestLikeCommentValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.susanCharestLikeComment), value, timeoutMs);
  }

  async expectSusanCharestLikeCommentEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.susanCharestLikeComment), timeoutMs);
  }

  async expectSusanCharestLikeCommentDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.susanCharestLikeComment), timeoutMs);
  }

  async expectSusanCharestLikeCommentChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.susanCharestLikeComment), timeoutMs);
  }

  async expectSusanCharestLikeCommentUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.susanCharestLikeComment), timeoutMs);
  }

  async expectSusanCharestLikeCommentFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.susanCharestLikeComment), timeoutMs);
  }

  async expectSusanCharestLikeCommentCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.susanCharestLikeComment), count, timeoutMs);
  }

  async scrollSusanCharestLikeCommentIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.susanCharestLikeComment));
  }

  async clickExceptionalCustomerExperienceCx4(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCx4));
  }

  async doubleClickExceptionalCustomerExperienceCx4(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCx4));
  }

  async longPressExceptionalCustomerExperienceCx4(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCx4));
  }

  async expectExceptionalCustomerExperienceCx4Hidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCx4), timeoutMs);
  }

  async expectExceptionalCustomerExperienceCx4Text(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCx4), expected, timeoutMs);
  }

  async expectExceptionalCustomerExperienceCx4ContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCx4), substring, timeoutMs);
  }

  async expectExceptionalCustomerExperienceCx4Value(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCx4), value, timeoutMs);
  }

  async expectExceptionalCustomerExperienceCx4Enabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCx4), timeoutMs);
  }

  async expectExceptionalCustomerExperienceCx4Disabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCx4), timeoutMs);
  }

  async expectExceptionalCustomerExperienceCx4Checked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCx4), timeoutMs);
  }

  async expectExceptionalCustomerExperienceCx4Unchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCx4), timeoutMs);
  }

  async expectExceptionalCustomerExperienceCx4Focused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCx4), timeoutMs);
  }

  async expectExceptionalCustomerExperienceCx4Count(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCx4), count, timeoutMs);
  }

  async scrollExceptionalCustomerExperienceCx4IntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.exceptionalCustomerExperienceCx4));
  }

  async doubleClickJulianaVanAmsterdamLikeCommentShare(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.julianaVanAmsterdamLikeCommentShare));
  }

  async longPressJulianaVanAmsterdamLikeCommentShare(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.julianaVanAmsterdamLikeCommentShare));
  }

  async expectJulianaVanAmsterdamLikeCommentShareHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.julianaVanAmsterdamLikeCommentShare), timeoutMs);
  }

  async expectJulianaVanAmsterdamLikeCommentShareText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.julianaVanAmsterdamLikeCommentShare), expected, timeoutMs);
  }

  async expectJulianaVanAmsterdamLikeCommentShareContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.julianaVanAmsterdamLikeCommentShare), substring, timeoutMs);
  }

  async expectJulianaVanAmsterdamLikeCommentShareValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.julianaVanAmsterdamLikeCommentShare), value, timeoutMs);
  }

  async expectJulianaVanAmsterdamLikeCommentShareEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.julianaVanAmsterdamLikeCommentShare), timeoutMs);
  }

  async expectJulianaVanAmsterdamLikeCommentShareDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.julianaVanAmsterdamLikeCommentShare), timeoutMs);
  }

  async expectJulianaVanAmsterdamLikeCommentShareChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.julianaVanAmsterdamLikeCommentShare), timeoutMs);
  }

  async expectJulianaVanAmsterdamLikeCommentShareUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.julianaVanAmsterdamLikeCommentShare), timeoutMs);
  }

  async expectJulianaVanAmsterdamLikeCommentShareFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.julianaVanAmsterdamLikeCommentShare), timeoutMs);
  }

  async expectJulianaVanAmsterdamLikeCommentShareCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.julianaVanAmsterdamLikeCommentShare), count, timeoutMs);
  }

  async scrollJulianaVanAmsterdamLikeCommentShareIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.julianaVanAmsterdamLikeCommentShare));
  }

  async clickExperienceOperationsInternalNewsletter(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.experienceOperationsInternalNewsletter));
  }

  async doubleClickExperienceOperationsInternalNewsletter(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.experienceOperationsInternalNewsletter));
  }

  async longPressExperienceOperationsInternalNewsletter(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.experienceOperationsInternalNewsletter));
  }

  async expectExperienceOperationsInternalNewsletterHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.experienceOperationsInternalNewsletter), timeoutMs);
  }

  async expectExperienceOperationsInternalNewsletterText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.experienceOperationsInternalNewsletter), expected, timeoutMs);
  }

  async expectExperienceOperationsInternalNewsletterContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.experienceOperationsInternalNewsletter), substring, timeoutMs);
  }

  async expectExperienceOperationsInternalNewsletterValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.experienceOperationsInternalNewsletter), value, timeoutMs);
  }

  async expectExperienceOperationsInternalNewsletterEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.experienceOperationsInternalNewsletter), timeoutMs);
  }

  async expectExperienceOperationsInternalNewsletterDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.experienceOperationsInternalNewsletter), timeoutMs);
  }

  async expectExperienceOperationsInternalNewsletterChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.experienceOperationsInternalNewsletter), timeoutMs);
  }

  async expectExperienceOperationsInternalNewsletterUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.experienceOperationsInternalNewsletter), timeoutMs);
  }

  async expectExperienceOperationsInternalNewsletterFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.experienceOperationsInternalNewsletter), timeoutMs);
  }

  async expectExperienceOperationsInternalNewsletterCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.experienceOperationsInternalNewsletter), count, timeoutMs);
  }

  async scrollExperienceOperationsInternalNewsletterIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.experienceOperationsInternalNewsletter));
  }

  async clickTheExperienceOperationsTeam(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.theExperienceOperationsTeam));
  }

  async doubleClickTheExperienceOperationsTeam(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.theExperienceOperationsTeam));
  }

  async longPressTheExperienceOperationsTeam(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.theExperienceOperationsTeam));
  }

  async expectTheExperienceOperationsTeamHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.theExperienceOperationsTeam), timeoutMs);
  }

  async expectTheExperienceOperationsTeamText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.theExperienceOperationsTeam), expected, timeoutMs);
  }

  async expectTheExperienceOperationsTeamContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.theExperienceOperationsTeam), substring, timeoutMs);
  }

  async expectTheExperienceOperationsTeamValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.theExperienceOperationsTeam), value, timeoutMs);
  }

  async expectTheExperienceOperationsTeamEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.theExperienceOperationsTeam), timeoutMs);
  }

  async expectTheExperienceOperationsTeamDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.theExperienceOperationsTeam), timeoutMs);
  }

  async expectTheExperienceOperationsTeamChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.theExperienceOperationsTeam), timeoutMs);
  }

  async expectTheExperienceOperationsTeamUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.theExperienceOperationsTeam), timeoutMs);
  }

  async expectTheExperienceOperationsTeamFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.theExperienceOperationsTeam), timeoutMs);
  }

  async expectTheExperienceOperationsTeamCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.theExperienceOperationsTeam), count, timeoutMs);
  }

  async scrollTheExperienceOperationsTeamIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.theExperienceOperationsTeam));
  }

  async doubleClickJennReaLikeCommentShare(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.jennReaLikeCommentShare));
  }

  async longPressJennReaLikeCommentShare(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.jennReaLikeCommentShare));
  }

  async expectJennReaLikeCommentShareHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.jennReaLikeCommentShare), timeoutMs);
  }

  async expectJennReaLikeCommentShareText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.jennReaLikeCommentShare), expected, timeoutMs);
  }

  async expectJennReaLikeCommentShareContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.jennReaLikeCommentShare), substring, timeoutMs);
  }

  async expectJennReaLikeCommentShareValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.jennReaLikeCommentShare), value, timeoutMs);
  }

  async expectJennReaLikeCommentShareEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.jennReaLikeCommentShare), timeoutMs);
  }

  async expectJennReaLikeCommentShareDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.jennReaLikeCommentShare), timeoutMs);
  }

  async expectJennReaLikeCommentShareChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.jennReaLikeCommentShare), timeoutMs);
  }

  async expectJennReaLikeCommentShareUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.jennReaLikeCommentShare), timeoutMs);
  }

  async expectJennReaLikeCommentShareFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.jennReaLikeCommentShare), timeoutMs);
  }

  async expectJennReaLikeCommentShareCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.jennReaLikeCommentShare), count, timeoutMs);
  }

  async scrollJennReaLikeCommentShareIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.jennReaLikeCommentShare));
  }

  async clickAsOurFirst(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.asOurFirst));
  }

  async doubleClickAsOurFirst(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.asOurFirst));
  }

  async longPressAsOurFirst(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.asOurFirst));
  }

  async expectAsOurFirstHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.asOurFirst), timeoutMs);
  }

  async expectAsOurFirstText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.asOurFirst), expected, timeoutMs);
  }

  async expectAsOurFirstContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.asOurFirst), substring, timeoutMs);
  }

  async expectAsOurFirstValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.asOurFirst), value, timeoutMs);
  }

  async expectAsOurFirstEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.asOurFirst), timeoutMs);
  }

  async expectAsOurFirstDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.asOurFirst), timeoutMs);
  }

  async expectAsOurFirstChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.asOurFirst), timeoutMs);
  }

  async expectAsOurFirstUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.asOurFirst), timeoutMs);
  }

  async expectAsOurFirstFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.asOurFirst), timeoutMs);
  }

  async expectAsOurFirstCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.asOurFirst), count, timeoutMs);
  }

  async scrollAsOurFirstIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.asOurFirst));
  }

  async clickLinkToOurNewsletterLikeCommentShare(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.linkToOurNewsletterLikeCommentShare));
  }

  async doubleClickLinkToOurNewsletterLikeCommentShare(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.linkToOurNewsletterLikeCommentShare));
  }

  async longPressLinkToOurNewsletterLikeCommentShare(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.linkToOurNewsletterLikeCommentShare));
  }

  async expectLinkToOurNewsletterLikeCommentShareHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.linkToOurNewsletterLikeCommentShare), timeoutMs);
  }

  async expectLinkToOurNewsletterLikeCommentShareText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.linkToOurNewsletterLikeCommentShare), expected, timeoutMs);
  }

  async expectLinkToOurNewsletterLikeCommentShareContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.linkToOurNewsletterLikeCommentShare), substring, timeoutMs);
  }

  async expectLinkToOurNewsletterLikeCommentShareValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.linkToOurNewsletterLikeCommentShare), value, timeoutMs);
  }

  async expectLinkToOurNewsletterLikeCommentShareEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.linkToOurNewsletterLikeCommentShare), timeoutMs);
  }

  async expectLinkToOurNewsletterLikeCommentShareDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.linkToOurNewsletterLikeCommentShare), timeoutMs);
  }

  async expectLinkToOurNewsletterLikeCommentShareChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.linkToOurNewsletterLikeCommentShare), timeoutMs);
  }

  async expectLinkToOurNewsletterLikeCommentShareUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.linkToOurNewsletterLikeCommentShare), timeoutMs);
  }

  async expectLinkToOurNewsletterLikeCommentShareFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.linkToOurNewsletterLikeCommentShare), timeoutMs);
  }

  async expectLinkToOurNewsletterLikeCommentShareCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.linkToOurNewsletterLikeCommentShare), count, timeoutMs);
  }

  async scrollLinkToOurNewsletterLikeCommentShareIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.linkToOurNewsletterLikeCommentShare));
  }

  async clickWeRecommendOpeningIn(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.weRecommendOpeningIn));
  }

  async doubleClickWeRecommendOpeningIn(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.weRecommendOpeningIn));
  }

  async longPressWeRecommendOpeningIn(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.weRecommendOpeningIn));
  }

  async expectWeRecommendOpeningInHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.weRecommendOpeningIn), timeoutMs);
  }

  async expectWeRecommendOpeningInText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.weRecommendOpeningIn), expected, timeoutMs);
  }

  async expectWeRecommendOpeningInContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.weRecommendOpeningIn), substring, timeoutMs);
  }

  async expectWeRecommendOpeningInValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.weRecommendOpeningIn), value, timeoutMs);
  }

  async expectWeRecommendOpeningInEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.weRecommendOpeningIn), timeoutMs);
  }

  async expectWeRecommendOpeningInDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.weRecommendOpeningIn), timeoutMs);
  }

  async expectWeRecommendOpeningInChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.weRecommendOpeningIn), timeoutMs);
  }

  async expectWeRecommendOpeningInUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.weRecommendOpeningIn), timeoutMs);
  }

  async expectWeRecommendOpeningInFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.weRecommendOpeningIn), timeoutMs);
  }

  async expectWeRecommendOpeningInCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.weRecommendOpeningIn), count, timeoutMs);
  }

  async scrollWeRecommendOpeningInIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.weRecommendOpeningIn));
  }

  async doubleClickLynetteKenneyLikeCommentShare(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.lynetteKenneyLikeCommentShare));
  }

  async longPressLynetteKenneyLikeCommentShare(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.lynetteKenneyLikeCommentShare));
  }

  async expectLynetteKenneyLikeCommentShareHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.lynetteKenneyLikeCommentShare), timeoutMs);
  }

  async expectLynetteKenneyLikeCommentShareText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.lynetteKenneyLikeCommentShare), expected, timeoutMs);
  }

  async expectLynetteKenneyLikeCommentShareContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.lynetteKenneyLikeCommentShare), substring, timeoutMs);
  }

  async expectLynetteKenneyLikeCommentShareValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.lynetteKenneyLikeCommentShare), value, timeoutMs);
  }

  async expectLynetteKenneyLikeCommentShareEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.lynetteKenneyLikeCommentShare), timeoutMs);
  }

  async expectLynetteKenneyLikeCommentShareDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.lynetteKenneyLikeCommentShare), timeoutMs);
  }

  async expectLynetteKenneyLikeCommentShareChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.lynetteKenneyLikeCommentShare), timeoutMs);
  }

  async expectLynetteKenneyLikeCommentShareUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.lynetteKenneyLikeCommentShare), timeoutMs);
  }

  async expectLynetteKenneyLikeCommentShareFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.lynetteKenneyLikeCommentShare), timeoutMs);
  }

  async expectLynetteKenneyLikeCommentShareCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.lynetteKenneyLikeCommentShare), count, timeoutMs);
  }

  async scrollLynetteKenneyLikeCommentShareIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.lynetteKenneyLikeCommentShare));
  }

  async doubleClickDevinShane(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.devinShane));
  }

  async longPressDevinShane(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.devinShane));
  }

  async expectDevinShaneHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.devinShane), timeoutMs);
  }

  async expectDevinShaneText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.devinShane), expected, timeoutMs);
  }

  async expectDevinShaneContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.devinShane), substring, timeoutMs);
  }

  async expectDevinShaneValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.devinShane), value, timeoutMs);
  }

  async expectDevinShaneEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.devinShane), timeoutMs);
  }

  async expectDevinShaneDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.devinShane), timeoutMs);
  }

  async expectDevinShaneChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.devinShane), timeoutMs);
  }

  async expectDevinShaneUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.devinShane), timeoutMs);
  }

  async expectDevinShaneFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.devinShane), timeoutMs);
  }

  async expectDevinShaneCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.devinShane), count, timeoutMs);
  }

  async scrollDevinShaneIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.devinShane));
  }

  async doubleClickNancyBurdzelLikeCommentShare(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.nancyBurdzelLikeCommentShare));
  }

  async longPressNancyBurdzelLikeCommentShare(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.nancyBurdzelLikeCommentShare));
  }

  async expectNancyBurdzelLikeCommentShareHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.nancyBurdzelLikeCommentShare), timeoutMs);
  }

  async expectNancyBurdzelLikeCommentShareText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.nancyBurdzelLikeCommentShare), expected, timeoutMs);
  }

  async expectNancyBurdzelLikeCommentShareContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.nancyBurdzelLikeCommentShare), substring, timeoutMs);
  }

  async expectNancyBurdzelLikeCommentShareValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.nancyBurdzelLikeCommentShare), value, timeoutMs);
  }

  async expectNancyBurdzelLikeCommentShareEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.nancyBurdzelLikeCommentShare), timeoutMs);
  }

  async expectNancyBurdzelLikeCommentShareDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.nancyBurdzelLikeCommentShare), timeoutMs);
  }

  async expectNancyBurdzelLikeCommentShareChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.nancyBurdzelLikeCommentShare), timeoutMs);
  }

  async expectNancyBurdzelLikeCommentShareUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.nancyBurdzelLikeCommentShare), timeoutMs);
  }

  async expectNancyBurdzelLikeCommentShareFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.nancyBurdzelLikeCommentShare), timeoutMs);
  }

  async expectNancyBurdzelLikeCommentShareCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.nancyBurdzelLikeCommentShare), count, timeoutMs);
  }

  async scrollNancyBurdzelLikeCommentShareIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.nancyBurdzelLikeCommentShare));
  }

  async doubleClickSusanPaugh(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.susanPaugh));
  }

  async longPressSusanPaugh(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.susanPaugh));
  }

  async expectSusanPaughHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.susanPaugh), timeoutMs);
  }

  async expectSusanPaughText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.susanPaugh), expected, timeoutMs);
  }

  async expectSusanPaughContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.susanPaugh), substring, timeoutMs);
  }

  async expectSusanPaughValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.susanPaugh), value, timeoutMs);
  }

  async expectSusanPaughEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.susanPaugh), timeoutMs);
  }

  async expectSusanPaughDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.susanPaugh), timeoutMs);
  }

  async expectSusanPaughChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.susanPaugh), timeoutMs);
  }

  async expectSusanPaughUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.susanPaugh), timeoutMs);
  }

  async expectSusanPaughFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.susanPaugh), timeoutMs);
  }

  async expectSusanPaughCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.susanPaugh), count, timeoutMs);
  }

  async scrollSusanPaughIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.susanPaugh));
  }

  async doubleClickAliLyderNortonLikeCommentShare(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.aliLyderNortonLikeCommentShare));
  }

  async longPressAliLyderNortonLikeCommentShare(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.aliLyderNortonLikeCommentShare));
  }

  async expectAliLyderNortonLikeCommentShareHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.aliLyderNortonLikeCommentShare), timeoutMs);
  }

  async expectAliLyderNortonLikeCommentShareText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.aliLyderNortonLikeCommentShare), expected, timeoutMs);
  }

  async expectAliLyderNortonLikeCommentShareContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.aliLyderNortonLikeCommentShare), substring, timeoutMs);
  }

  async expectAliLyderNortonLikeCommentShareValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.aliLyderNortonLikeCommentShare), value, timeoutMs);
  }

  async expectAliLyderNortonLikeCommentShareEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.aliLyderNortonLikeCommentShare), timeoutMs);
  }

  async expectAliLyderNortonLikeCommentShareDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.aliLyderNortonLikeCommentShare), timeoutMs);
  }

  async expectAliLyderNortonLikeCommentShareChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.aliLyderNortonLikeCommentShare), timeoutMs);
  }

  async expectAliLyderNortonLikeCommentShareUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.aliLyderNortonLikeCommentShare), timeoutMs);
  }

  async expectAliLyderNortonLikeCommentShareFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.aliLyderNortonLikeCommentShare), timeoutMs);
  }

  async expectAliLyderNortonLikeCommentShareCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.aliLyderNortonLikeCommentShare), count, timeoutMs);
  }

  async scrollAliLyderNortonLikeCommentShareIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.aliLyderNortonLikeCommentShare));
  }

  async doubleClickBradleyChandler(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.bradleyChandler));
  }

  async longPressBradleyChandler(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.bradleyChandler));
  }

  async expectBradleyChandlerHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.bradleyChandler), timeoutMs);
  }

  async expectBradleyChandlerText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.bradleyChandler), expected, timeoutMs);
  }

  async expectBradleyChandlerContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.bradleyChandler), substring, timeoutMs);
  }

  async expectBradleyChandlerValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.bradleyChandler), value, timeoutMs);
  }

  async expectBradleyChandlerEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.bradleyChandler), timeoutMs);
  }

  async expectBradleyChandlerDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.bradleyChandler), timeoutMs);
  }

  async expectBradleyChandlerChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.bradleyChandler), timeoutMs);
  }

  async expectBradleyChandlerUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.bradleyChandler), timeoutMs);
  }

  async expectBradleyChandlerFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.bradleyChandler), timeoutMs);
  }

  async expectBradleyChandlerCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.bradleyChandler), count, timeoutMs);
  }

  async scrollBradleyChandlerIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.bradleyChandler));
  }

  async doubleClickDavidDownie(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.davidDownie));
  }

  async longPressDavidDownie(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.davidDownie));
  }

  async expectDavidDownieHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.davidDownie), timeoutMs);
  }

  async expectDavidDownieText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.davidDownie), expected, timeoutMs);
  }

  async expectDavidDownieContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.davidDownie), substring, timeoutMs);
  }

  async expectDavidDownieValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.davidDownie), value, timeoutMs);
  }

  async expectDavidDownieEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.davidDownie), timeoutMs);
  }

  async expectDavidDownieDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.davidDownie), timeoutMs);
  }

  async expectDavidDownieChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.davidDownie), timeoutMs);
  }

  async expectDavidDownieUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.davidDownie), timeoutMs);
  }

  async expectDavidDownieFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.davidDownie), timeoutMs);
  }

  async expectDavidDownieCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.davidDownie), count, timeoutMs);
  }

  async scrollDavidDownieIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.davidDownie));
  }

  async doubleClickAllThingsMarketing(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.allThingsMarketing));
  }

  async longPressAllThingsMarketing(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.allThingsMarketing));
  }

  async expectAllThingsMarketingHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.allThingsMarketing), timeoutMs);
  }

  async expectAllThingsMarketingText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.allThingsMarketing), expected, timeoutMs);
  }

  async expectAllThingsMarketingContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.allThingsMarketing), substring, timeoutMs);
  }

  async expectAllThingsMarketingValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.allThingsMarketing), value, timeoutMs);
  }

  async expectAllThingsMarketingEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.allThingsMarketing), timeoutMs);
  }

  async expectAllThingsMarketingDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.allThingsMarketing), timeoutMs);
  }

  async expectAllThingsMarketingChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.allThingsMarketing), timeoutMs);
  }

  async expectAllThingsMarketingUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.allThingsMarketing), timeoutMs);
  }

  async expectAllThingsMarketingFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.allThingsMarketing), timeoutMs);
  }

  async expectAllThingsMarketingCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.allThingsMarketing), count, timeoutMs);
  }

  async scrollAllThingsMarketingIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.allThingsMarketing));
  }

  async doubleClickAllThingsCloud(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.allThingsCloud));
  }

  async longPressAllThingsCloud(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.allThingsCloud));
  }

  async expectAllThingsCloudHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.allThingsCloud), timeoutMs);
  }

  async expectAllThingsCloudText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.allThingsCloud), expected, timeoutMs);
  }

  async expectAllThingsCloudContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.allThingsCloud), substring, timeoutMs);
  }

  async expectAllThingsCloudValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.allThingsCloud), value, timeoutMs);
  }

  async expectAllThingsCloudEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.allThingsCloud), timeoutMs);
  }

  async expectAllThingsCloudDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.allThingsCloud), timeoutMs);
  }

  async expectAllThingsCloudChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.allThingsCloud), timeoutMs);
  }

  async expectAllThingsCloudUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.allThingsCloud), timeoutMs);
  }

  async expectAllThingsCloudFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.allThingsCloud), timeoutMs);
  }

  async expectAllThingsCloudCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.allThingsCloud), count, timeoutMs);
  }

  async scrollAllThingsCloudIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.allThingsCloud));
  }

  async doubleClickAllThingsIt(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.allThingsIt));
  }

  async longPressAllThingsIt(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.allThingsIt));
  }

  async expectAllThingsItHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.allThingsIt), timeoutMs);
  }

  async expectAllThingsItText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.allThingsIt), expected, timeoutMs);
  }

  async expectAllThingsItContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.allThingsIt), substring, timeoutMs);
  }

  async expectAllThingsItValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.allThingsIt), value, timeoutMs);
  }

  async expectAllThingsItEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.allThingsIt), timeoutMs);
  }

  async expectAllThingsItDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.allThingsIt), timeoutMs);
  }

  async expectAllThingsItChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.allThingsIt), timeoutMs);
  }

  async expectAllThingsItUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.allThingsIt), timeoutMs);
  }

  async expectAllThingsItFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.allThingsIt), timeoutMs);
  }

  async expectAllThingsItCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.allThingsIt), count, timeoutMs);
  }

  async scrollAllThingsItIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.allThingsIt));
  }

  async doubleClickKronosSharepointComLikeCommentShare(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.kronosSharepointComLikeCommentShare));
  }

  async longPressKronosSharepointComLikeCommentShare(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.kronosSharepointComLikeCommentShare));
  }

  async expectKronosSharepointComLikeCommentShareHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.kronosSharepointComLikeCommentShare), timeoutMs);
  }

  async expectKronosSharepointComLikeCommentShareText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.kronosSharepointComLikeCommentShare), expected, timeoutMs);
  }

  async expectKronosSharepointComLikeCommentShareContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.kronosSharepointComLikeCommentShare), substring, timeoutMs);
  }

  async expectKronosSharepointComLikeCommentShareValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.kronosSharepointComLikeCommentShare), value, timeoutMs);
  }

  async expectKronosSharepointComLikeCommentShareEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.kronosSharepointComLikeCommentShare), timeoutMs);
  }

  async expectKronosSharepointComLikeCommentShareDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.kronosSharepointComLikeCommentShare), timeoutMs);
  }

  async expectKronosSharepointComLikeCommentShareChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.kronosSharepointComLikeCommentShare), timeoutMs);
  }

  async expectKronosSharepointComLikeCommentShareUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.kronosSharepointComLikeCommentShare), timeoutMs);
  }

  async expectKronosSharepointComLikeCommentShareFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.kronosSharepointComLikeCommentShare), timeoutMs);
  }

  async expectKronosSharepointComLikeCommentShareCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.kronosSharepointComLikeCommentShare), count, timeoutMs);
  }

  async scrollKronosSharepointComLikeCommentShareIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.kronosSharepointComLikeCommentShare));
  }

  async doubleClickHttpsKronosSharepointComWTCxOpsEXpPNVlYSFZMprYVzLDS2z4BGUWUirY57ve3Q6wJJo9wES8lnBgLikeCommentShare(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.httpsKronosSharepointComWTCxOpsEXpPNVlYSFZMprYVzLDS2z4BGUWUirY57ve3Q6wJJo9wES8lnBgLikeCommentShare));
  }

  async longPressHttpsKronosSharepointComWTCxOpsEXpPNVlYSFZMprYVzLDS2z4BGUWUirY57ve3Q6wJJo9wES8lnBgLikeCommentShare(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.httpsKronosSharepointComWTCxOpsEXpPNVlYSFZMprYVzLDS2z4BGUWUirY57ve3Q6wJJo9wES8lnBgLikeCommentShare));
  }

  async expectHttpsKronosSharepointComWTCxOpsEXpPNVlYSFZMprYVzLDS2z4BGUWUirY57ve3Q6wJJo9wES8lnBgLikeCommentShareHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.httpsKronosSharepointComWTCxOpsEXpPNVlYSFZMprYVzLDS2z4BGUWUirY57ve3Q6wJJo9wES8lnBgLikeCommentShare), timeoutMs);
  }

  async expectHttpsKronosSharepointComWTCxOpsEXpPNVlYSFZMprYVzLDS2z4BGUWUirY57ve3Q6wJJo9wES8lnBgLikeCommentShareText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.httpsKronosSharepointComWTCxOpsEXpPNVlYSFZMprYVzLDS2z4BGUWUirY57ve3Q6wJJo9wES8lnBgLikeCommentShare), expected, timeoutMs);
  }

  async expectHttpsKronosSharepointComWTCxOpsEXpPNVlYSFZMprYVzLDS2z4BGUWUirY57ve3Q6wJJo9wES8lnBgLikeCommentShareContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.httpsKronosSharepointComWTCxOpsEXpPNVlYSFZMprYVzLDS2z4BGUWUirY57ve3Q6wJJo9wES8lnBgLikeCommentShare), substring, timeoutMs);
  }

  async expectHttpsKronosSharepointComWTCxOpsEXpPNVlYSFZMprYVzLDS2z4BGUWUirY57ve3Q6wJJo9wES8lnBgLikeCommentShareValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.httpsKronosSharepointComWTCxOpsEXpPNVlYSFZMprYVzLDS2z4BGUWUirY57ve3Q6wJJo9wES8lnBgLikeCommentShare), value, timeoutMs);
  }

  async expectHttpsKronosSharepointComWTCxOpsEXpPNVlYSFZMprYVzLDS2z4BGUWUirY57ve3Q6wJJo9wES8lnBgLikeCommentShareEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.httpsKronosSharepointComWTCxOpsEXpPNVlYSFZMprYVzLDS2z4BGUWUirY57ve3Q6wJJo9wES8lnBgLikeCommentShare), timeoutMs);
  }

  async expectHttpsKronosSharepointComWTCxOpsEXpPNVlYSFZMprYVzLDS2z4BGUWUirY57ve3Q6wJJo9wES8lnBgLikeCommentShareDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.httpsKronosSharepointComWTCxOpsEXpPNVlYSFZMprYVzLDS2z4BGUWUirY57ve3Q6wJJo9wES8lnBgLikeCommentShare), timeoutMs);
  }

  async expectHttpsKronosSharepointComWTCxOpsEXpPNVlYSFZMprYVzLDS2z4BGUWUirY57ve3Q6wJJo9wES8lnBgLikeCommentShareChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.httpsKronosSharepointComWTCxOpsEXpPNVlYSFZMprYVzLDS2z4BGUWUirY57ve3Q6wJJo9wES8lnBgLikeCommentShare), timeoutMs);
  }

  async expectHttpsKronosSharepointComWTCxOpsEXpPNVlYSFZMprYVzLDS2z4BGUWUirY57ve3Q6wJJo9wES8lnBgLikeCommentShareUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.httpsKronosSharepointComWTCxOpsEXpPNVlYSFZMprYVzLDS2z4BGUWUirY57ve3Q6wJJo9wES8lnBgLikeCommentShare), timeoutMs);
  }

  async expectHttpsKronosSharepointComWTCxOpsEXpPNVlYSFZMprYVzLDS2z4BGUWUirY57ve3Q6wJJo9wES8lnBgLikeCommentShareFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.httpsKronosSharepointComWTCxOpsEXpPNVlYSFZMprYVzLDS2z4BGUWUirY57ve3Q6wJJo9wES8lnBgLikeCommentShare), timeoutMs);
  }

  async expectHttpsKronosSharepointComWTCxOpsEXpPNVlYSFZMprYVzLDS2z4BGUWUirY57ve3Q6wJJo9wES8lnBgLikeCommentShareCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.httpsKronosSharepointComWTCxOpsEXpPNVlYSFZMprYVzLDS2z4BGUWUirY57ve3Q6wJJo9wES8lnBgLikeCommentShare), count, timeoutMs);
  }

  async scrollHttpsKronosSharepointComWTCxOpsEXpPNVlYSFZMprYVzLDS2z4BGUWUirY57ve3Q6wJJo9wES8lnBgLikeCommentShareIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.httpsKronosSharepointComWTCxOpsEXpPNVlYSFZMprYVzLDS2z4BGUWUirY57ve3Q6wJJo9wES8lnBgLikeCommentShare));
  }

  async doubleClickCommentsLikeCommentShare2(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.commentsLikeCommentShare2));
  }

  async longPressCommentsLikeCommentShare2(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.commentsLikeCommentShare2));
  }

  async expectCommentsLikeCommentShare2Hidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.commentsLikeCommentShare2), timeoutMs);
  }

  async expectCommentsLikeCommentShare2Text(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.commentsLikeCommentShare2), expected, timeoutMs);
  }

  async expectCommentsLikeCommentShare2ContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.commentsLikeCommentShare2), substring, timeoutMs);
  }

  async expectCommentsLikeCommentShare2Value(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.commentsLikeCommentShare2), value, timeoutMs);
  }

  async expectCommentsLikeCommentShare2Enabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.commentsLikeCommentShare2), timeoutMs);
  }

  async expectCommentsLikeCommentShare2Disabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.commentsLikeCommentShare2), timeoutMs);
  }

  async expectCommentsLikeCommentShare2Checked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.commentsLikeCommentShare2), timeoutMs);
  }

  async expectCommentsLikeCommentShare2Unchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.commentsLikeCommentShare2), timeoutMs);
  }

  async expectCommentsLikeCommentShare2Focused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.commentsLikeCommentShare2), timeoutMs);
  }

  async expectCommentsLikeCommentShare2Count(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.commentsLikeCommentShare2), count, timeoutMs);
  }

  async scrollCommentsLikeCommentShare2IntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.commentsLikeCommentShare2));
  }

  async doubleClickSeenBy30LikeCommentShare(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.seenBy30LikeCommentShare));
  }

  async longPressSeenBy30LikeCommentShare(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.seenBy30LikeCommentShare));
  }

  async expectSeenBy30LikeCommentShareHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.seenBy30LikeCommentShare), timeoutMs);
  }

  async expectSeenBy30LikeCommentShareText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.seenBy30LikeCommentShare), expected, timeoutMs);
  }

  async expectSeenBy30LikeCommentShareContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.seenBy30LikeCommentShare), substring, timeoutMs);
  }

  async expectSeenBy30LikeCommentShareValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.seenBy30LikeCommentShare), value, timeoutMs);
  }

  async expectSeenBy30LikeCommentShareEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.seenBy30LikeCommentShare), timeoutMs);
  }

  async expectSeenBy30LikeCommentShareDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.seenBy30LikeCommentShare), timeoutMs);
  }

  async expectSeenBy30LikeCommentShareChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.seenBy30LikeCommentShare), timeoutMs);
  }

  async expectSeenBy30LikeCommentShareUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.seenBy30LikeCommentShare), timeoutMs);
  }

  async expectSeenBy30LikeCommentShareFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.seenBy30LikeCommentShare), timeoutMs);
  }

  async expectSeenBy30LikeCommentShareCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.seenBy30LikeCommentShare), count, timeoutMs);
  }

  async scrollSeenBy30LikeCommentShareIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.seenBy30LikeCommentShare));
  }

  async doubleClickErinFord(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.erinFord));
  }

  async longPressErinFord(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.erinFord));
  }

  async expectErinFordHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.erinFord), timeoutMs);
  }

  async expectErinFordText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.erinFord), expected, timeoutMs);
  }

  async expectErinFordContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.erinFord), substring, timeoutMs);
  }

  async expectErinFordValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.erinFord), value, timeoutMs);
  }

  async expectErinFordEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.erinFord), timeoutMs);
  }

  async expectErinFordDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.erinFord), timeoutMs);
  }

  async expectErinFordChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.erinFord), timeoutMs);
  }

  async expectErinFordUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.erinFord), timeoutMs);
  }

  async expectErinFordFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.erinFord), timeoutMs);
  }

  async expectErinFordCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.erinFord), count, timeoutMs);
  }

  async scrollErinFordIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.erinFord));
  }

  async doubleClickAndreaChadis(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.andreaChadis));
  }

  async longPressAndreaChadis(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.andreaChadis));
  }

  async expectAndreaChadisHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.andreaChadis), timeoutMs);
  }

  async expectAndreaChadisText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.andreaChadis), expected, timeoutMs);
  }

  async expectAndreaChadisContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.andreaChadis), substring, timeoutMs);
  }

  async expectAndreaChadisValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.andreaChadis), value, timeoutMs);
  }

  async expectAndreaChadisEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.andreaChadis), timeoutMs);
  }

  async expectAndreaChadisDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.andreaChadis), timeoutMs);
  }

  async expectAndreaChadisChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.andreaChadis), timeoutMs);
  }

  async expectAndreaChadisUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.andreaChadis), timeoutMs);
  }

  async expectAndreaChadisFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.andreaChadis), timeoutMs);
  }

  async expectAndreaChadisCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.andreaChadis), count, timeoutMs);
  }

  async scrollAndreaChadisIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.andreaChadis));
  }

  async doubleClickOthersLikeCommentShare3(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.othersLikeCommentShare3));
  }

  async longPressOthersLikeCommentShare3(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.othersLikeCommentShare3));
  }

  async expectOthersLikeCommentShare3Hidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.othersLikeCommentShare3), timeoutMs);
  }

  async expectOthersLikeCommentShare3Text(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.othersLikeCommentShare3), expected, timeoutMs);
  }

  async expectOthersLikeCommentShare3ContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.othersLikeCommentShare3), substring, timeoutMs);
  }

  async expectOthersLikeCommentShare3Value(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.othersLikeCommentShare3), value, timeoutMs);
  }

  async expectOthersLikeCommentShare3Enabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.othersLikeCommentShare3), timeoutMs);
  }

  async expectOthersLikeCommentShare3Disabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.othersLikeCommentShare3), timeoutMs);
  }

  async expectOthersLikeCommentShare3Checked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.othersLikeCommentShare3), timeoutMs);
  }

  async expectOthersLikeCommentShare3Unchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.othersLikeCommentShare3), timeoutMs);
  }

  async expectOthersLikeCommentShare3Focused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.othersLikeCommentShare3), timeoutMs);
  }

  async expectOthersLikeCommentShare3Count(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.othersLikeCommentShare3), count, timeoutMs);
  }

  async scrollOthersLikeCommentShare3IntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.othersLikeCommentShare3));
  }

  async clickPhyllisMerchant6Years(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.phyllisMerchant6Years));
  }

  async doubleClickPhyllisMerchant6Years(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.phyllisMerchant6Years));
  }

  async longPressPhyllisMerchant6Years(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.phyllisMerchant6Years));
  }

  async expectPhyllisMerchant6YearsHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.phyllisMerchant6Years), timeoutMs);
  }

  async expectPhyllisMerchant6YearsText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.phyllisMerchant6Years), expected, timeoutMs);
  }

  async expectPhyllisMerchant6YearsContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.phyllisMerchant6Years), substring, timeoutMs);
  }

  async expectPhyllisMerchant6YearsValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.phyllisMerchant6Years), value, timeoutMs);
  }

  async expectPhyllisMerchant6YearsEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.phyllisMerchant6Years), timeoutMs);
  }

  async expectPhyllisMerchant6YearsDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.phyllisMerchant6Years), timeoutMs);
  }

  async expectPhyllisMerchant6YearsChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.phyllisMerchant6Years), timeoutMs);
  }

  async expectPhyllisMerchant6YearsUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.phyllisMerchant6Years), timeoutMs);
  }

  async expectPhyllisMerchant6YearsFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.phyllisMerchant6Years), timeoutMs);
  }

  async expectPhyllisMerchant6YearsCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.phyllisMerchant6Years), count, timeoutMs);
  }

  async scrollPhyllisMerchant6YearsIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.phyllisMerchant6Years));
  }

  async doubleClickPhyllisMerchantLikeCommentShare(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.phyllisMerchantLikeCommentShare));
  }

  async longPressPhyllisMerchantLikeCommentShare(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.phyllisMerchantLikeCommentShare));
  }

  async expectPhyllisMerchantLikeCommentShareHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.phyllisMerchantLikeCommentShare), timeoutMs);
  }

  async expectPhyllisMerchantLikeCommentShareText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.phyllisMerchantLikeCommentShare), expected, timeoutMs);
  }

  async expectPhyllisMerchantLikeCommentShareContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.phyllisMerchantLikeCommentShare), substring, timeoutMs);
  }

  async expectPhyllisMerchantLikeCommentShareValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.phyllisMerchantLikeCommentShare), value, timeoutMs);
  }

  async expectPhyllisMerchantLikeCommentShareEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.phyllisMerchantLikeCommentShare), timeoutMs);
  }

  async expectPhyllisMerchantLikeCommentShareDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.phyllisMerchantLikeCommentShare), timeoutMs);
  }

  async expectPhyllisMerchantLikeCommentShareChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.phyllisMerchantLikeCommentShare), timeoutMs);
  }

  async expectPhyllisMerchantLikeCommentShareUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.phyllisMerchantLikeCommentShare), timeoutMs);
  }

  async expectPhyllisMerchantLikeCommentShareFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.phyllisMerchantLikeCommentShare), timeoutMs);
  }

  async expectPhyllisMerchantLikeCommentShareCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.phyllisMerchantLikeCommentShare), count, timeoutMs);
  }

  async scrollPhyllisMerchantLikeCommentShareIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.phyllisMerchantLikeCommentShare));
  }

  async clickNancyBurdzelLooksGood(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.nancyBurdzelLooksGood));
  }

  async doubleClickNancyBurdzelLooksGood(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.nancyBurdzelLooksGood));
  }

  async longPressNancyBurdzelLooksGood(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.nancyBurdzelLooksGood));
  }

  async expectNancyBurdzelLooksGoodHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.nancyBurdzelLooksGood), timeoutMs);
  }

  async expectNancyBurdzelLooksGoodText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.nancyBurdzelLooksGood), expected, timeoutMs);
  }

  async expectNancyBurdzelLooksGoodContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.nancyBurdzelLooksGood), substring, timeoutMs);
  }

  async expectNancyBurdzelLooksGoodValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.nancyBurdzelLooksGood), value, timeoutMs);
  }

  async expectNancyBurdzelLooksGoodEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.nancyBurdzelLooksGood), timeoutMs);
  }

  async expectNancyBurdzelLooksGoodDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.nancyBurdzelLooksGood), timeoutMs);
  }

  async expectNancyBurdzelLooksGoodChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.nancyBurdzelLooksGood), timeoutMs);
  }

  async expectNancyBurdzelLooksGoodUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.nancyBurdzelLooksGood), timeoutMs);
  }

  async expectNancyBurdzelLooksGoodFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.nancyBurdzelLooksGood), timeoutMs);
  }

  async expectNancyBurdzelLooksGoodCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.nancyBurdzelLooksGood), count, timeoutMs);
  }

  async scrollNancyBurdzelLooksGoodIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.nancyBurdzelLooksGood));
  }

  async clickHiThere(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.hiThere));
  }

  async doubleClickHiThere(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.hiThere));
  }

  async longPressHiThere(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.hiThere));
  }

  async expectHiThereHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.hiThere), timeoutMs);
  }

  async expectHiThereText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.hiThere), expected, timeoutMs);
  }

  async expectHiThereContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.hiThere), substring, timeoutMs);
  }

  async expectHiThereValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.hiThere), value, timeoutMs);
  }

  async expectHiThereEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.hiThere), timeoutMs);
  }

  async expectHiThereDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.hiThere), timeoutMs);
  }

  async expectHiThereChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.hiThere), timeoutMs);
  }

  async expectHiThereUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.hiThere), timeoutMs);
  }

  async expectHiThereFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.hiThere), timeoutMs);
  }

  async expectHiThereCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.hiThere), count, timeoutMs);
  }

  async scrollHiThereIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.hiThere));
  }

  async clickItSBeenAFew(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.itSBeenAFew));
  }

  async doubleClickItSBeenAFew(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.itSBeenAFew));
  }

  async longPressItSBeenAFew(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.itSBeenAFew));
  }

  async expectItSBeenAFewHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.itSBeenAFew), timeoutMs);
  }

  async expectItSBeenAFewText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.itSBeenAFew), expected, timeoutMs);
  }

  async expectItSBeenAFewContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.itSBeenAFew), substring, timeoutMs);
  }

  async expectItSBeenAFewValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.itSBeenAFew), value, timeoutMs);
  }

  async expectItSBeenAFewEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.itSBeenAFew), timeoutMs);
  }

  async expectItSBeenAFewDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.itSBeenAFew), timeoutMs);
  }

  async expectItSBeenAFewChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.itSBeenAFew), timeoutMs);
  }

  async expectItSBeenAFewUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.itSBeenAFew), timeoutMs);
  }

  async expectItSBeenAFewFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.itSBeenAFew), timeoutMs);
  }

  async expectItSBeenAFewCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.itSBeenAFew), count, timeoutMs);
  }

  async scrollItSBeenAFewIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.itSBeenAFew));
  }

  async clickForFolksWhoWere(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.forFolksWhoWere));
  }

  async doubleClickForFolksWhoWere(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.forFolksWhoWere));
  }

  async longPressForFolksWhoWere(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.forFolksWhoWere));
  }

  async expectForFolksWhoWereHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.forFolksWhoWere), timeoutMs);
  }

  async expectForFolksWhoWereText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.forFolksWhoWere), expected, timeoutMs);
  }

  async expectForFolksWhoWereContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.forFolksWhoWere), substring, timeoutMs);
  }

  async expectForFolksWhoWereValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.forFolksWhoWere), value, timeoutMs);
  }

  async expectForFolksWhoWereEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.forFolksWhoWere), timeoutMs);
  }

  async expectForFolksWhoWereDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.forFolksWhoWere), timeoutMs);
  }

  async expectForFolksWhoWereChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.forFolksWhoWere), timeoutMs);
  }

  async expectForFolksWhoWereUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.forFolksWhoWere), timeoutMs);
  }

  async expectForFolksWhoWereFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.forFolksWhoWere), timeoutMs);
  }

  async expectForFolksWhoWereCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.forFolksWhoWere), count, timeoutMs);
  }

  async scrollForFolksWhoWereIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.forFolksWhoWere));
  }

  async clickMigrationsSharePointSite(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.migrationsSharePointSite));
  }

  async doubleClickMigrationsSharePointSite(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.migrationsSharePointSite));
  }

  async longPressMigrationsSharePointSite(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.migrationsSharePointSite));
  }

  async expectMigrationsSharePointSiteHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.migrationsSharePointSite), timeoutMs);
  }

  async expectMigrationsSharePointSiteText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.migrationsSharePointSite), expected, timeoutMs);
  }

  async expectMigrationsSharePointSiteContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.migrationsSharePointSite), substring, timeoutMs);
  }

  async expectMigrationsSharePointSiteValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.migrationsSharePointSite), value, timeoutMs);
  }

  async expectMigrationsSharePointSiteEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.migrationsSharePointSite), timeoutMs);
  }

  async expectMigrationsSharePointSiteDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.migrationsSharePointSite), timeoutMs);
  }

  async expectMigrationsSharePointSiteChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.migrationsSharePointSite), timeoutMs);
  }

  async expectMigrationsSharePointSiteUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.migrationsSharePointSite), timeoutMs);
  }

  async expectMigrationsSharePointSiteFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.migrationsSharePointSite), timeoutMs);
  }

  async expectMigrationsSharePointSiteCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.migrationsSharePointSite), count, timeoutMs);
  }

  async scrollMigrationsSharePointSiteIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.migrationsSharePointSite));
  }

  async clickMigrationsSharePoint(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.migrationsSharePoint));
  }

  async doubleClickMigrationsSharePoint(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.migrationsSharePoint));
  }

  async longPressMigrationsSharePoint(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.migrationsSharePoint));
  }

  async expectMigrationsSharePointHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.migrationsSharePoint), timeoutMs);
  }

  async expectMigrationsSharePointText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.migrationsSharePoint), expected, timeoutMs);
  }

  async expectMigrationsSharePointContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.migrationsSharePoint), substring, timeoutMs);
  }

  async expectMigrationsSharePointValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.migrationsSharePoint), value, timeoutMs);
  }

  async expectMigrationsSharePointEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.migrationsSharePoint), timeoutMs);
  }

  async expectMigrationsSharePointDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.migrationsSharePoint), timeoutMs);
  }

  async expectMigrationsSharePointChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.migrationsSharePoint), timeoutMs);
  }

  async expectMigrationsSharePointUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.migrationsSharePoint), timeoutMs);
  }

  async expectMigrationsSharePointFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.migrationsSharePoint), timeoutMs);
  }

  async expectMigrationsSharePointCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.migrationsSharePoint), count, timeoutMs);
  }

  async scrollMigrationsSharePointIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.migrationsSharePoint));
  }

  async doubleClickHttpsKronosSharepointComTeamsIndustrymarketingMigrations(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.httpsKronosSharepointComTeamsIndustrymarketingMigrations));
  }

  async longPressHttpsKronosSharepointComTeamsIndustrymarketingMigrations(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.httpsKronosSharepointComTeamsIndustrymarketingMigrations));
  }

  async expectHttpsKronosSharepointComTeamsIndustrymarketingMigrationsHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.httpsKronosSharepointComTeamsIndustrymarketingMigrations), timeoutMs);
  }

  async expectHttpsKronosSharepointComTeamsIndustrymarketingMigrationsText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.httpsKronosSharepointComTeamsIndustrymarketingMigrations), expected, timeoutMs);
  }

  async expectHttpsKronosSharepointComTeamsIndustrymarketingMigrationsContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.httpsKronosSharepointComTeamsIndustrymarketingMigrations), substring, timeoutMs);
  }

  async expectHttpsKronosSharepointComTeamsIndustrymarketingMigrationsValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.httpsKronosSharepointComTeamsIndustrymarketingMigrations), value, timeoutMs);
  }

  async expectHttpsKronosSharepointComTeamsIndustrymarketingMigrationsEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.httpsKronosSharepointComTeamsIndustrymarketingMigrations), timeoutMs);
  }

  async expectHttpsKronosSharepointComTeamsIndustrymarketingMigrationsDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.httpsKronosSharepointComTeamsIndustrymarketingMigrations), timeoutMs);
  }

  async expectHttpsKronosSharepointComTeamsIndustrymarketingMigrationsChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.httpsKronosSharepointComTeamsIndustrymarketingMigrations), timeoutMs);
  }

  async expectHttpsKronosSharepointComTeamsIndustrymarketingMigrationsUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.httpsKronosSharepointComTeamsIndustrymarketingMigrations), timeoutMs);
  }

  async expectHttpsKronosSharepointComTeamsIndustrymarketingMigrationsFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.httpsKronosSharepointComTeamsIndustrymarketingMigrations), timeoutMs);
  }

  async expectHttpsKronosSharepointComTeamsIndustrymarketingMigrationsCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.httpsKronosSharepointComTeamsIndustrymarketingMigrations), count, timeoutMs);
  }

  async scrollHttpsKronosSharepointComTeamsIndustrymarketingMigrationsIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.httpsKronosSharepointComTeamsIndustrymarketingMigrations));
  }

  async clickMigrationInsightsSalesforceFaq(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.migrationInsightsSalesforceFaq));
  }

  async doubleClickMigrationInsightsSalesforceFaq(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.migrationInsightsSalesforceFaq));
  }

  async longPressMigrationInsightsSalesforceFaq(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.migrationInsightsSalesforceFaq));
  }

  async expectMigrationInsightsSalesforceFaqHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.migrationInsightsSalesforceFaq), timeoutMs);
  }

  async expectMigrationInsightsSalesforceFaqText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.migrationInsightsSalesforceFaq), expected, timeoutMs);
  }

  async expectMigrationInsightsSalesforceFaqContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.migrationInsightsSalesforceFaq), substring, timeoutMs);
  }

  async expectMigrationInsightsSalesforceFaqValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.migrationInsightsSalesforceFaq), value, timeoutMs);
  }

  async expectMigrationInsightsSalesforceFaqEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.migrationInsightsSalesforceFaq), timeoutMs);
  }

  async expectMigrationInsightsSalesforceFaqDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.migrationInsightsSalesforceFaq), timeoutMs);
  }

  async expectMigrationInsightsSalesforceFaqChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.migrationInsightsSalesforceFaq), timeoutMs);
  }

  async expectMigrationInsightsSalesforceFaqUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.migrationInsightsSalesforceFaq), timeoutMs);
  }

  async expectMigrationInsightsSalesforceFaqFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.migrationInsightsSalesforceFaq), timeoutMs);
  }

  async expectMigrationInsightsSalesforceFaqCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.migrationInsightsSalesforceFaq), count, timeoutMs);
  }

  async scrollMigrationInsightsSalesforceFaqIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.migrationInsightsSalesforceFaq));
  }

  async clickMigrationInsightsSalesforceLikeCommentShare(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.migrationInsightsSalesforceLikeCommentShare));
  }

  async doubleClickMigrationInsightsSalesforceLikeCommentShare(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.migrationInsightsSalesforceLikeCommentShare));
  }

  async longPressMigrationInsightsSalesforceLikeCommentShare(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.migrationInsightsSalesforceLikeCommentShare));
  }

  async expectMigrationInsightsSalesforceLikeCommentShareHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.migrationInsightsSalesforceLikeCommentShare), timeoutMs);
  }

  async expectMigrationInsightsSalesforceLikeCommentShareText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.migrationInsightsSalesforceLikeCommentShare), expected, timeoutMs);
  }

  async expectMigrationInsightsSalesforceLikeCommentShareContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.migrationInsightsSalesforceLikeCommentShare), substring, timeoutMs);
  }

  async expectMigrationInsightsSalesforceLikeCommentShareValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.migrationInsightsSalesforceLikeCommentShare), value, timeoutMs);
  }

  async expectMigrationInsightsSalesforceLikeCommentShareEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.migrationInsightsSalesforceLikeCommentShare), timeoutMs);
  }

  async expectMigrationInsightsSalesforceLikeCommentShareDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.migrationInsightsSalesforceLikeCommentShare), timeoutMs);
  }

  async expectMigrationInsightsSalesforceLikeCommentShareChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.migrationInsightsSalesforceLikeCommentShare), timeoutMs);
  }

  async expectMigrationInsightsSalesforceLikeCommentShareUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.migrationInsightsSalesforceLikeCommentShare), timeoutMs);
  }

  async expectMigrationInsightsSalesforceLikeCommentShareFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.migrationInsightsSalesforceLikeCommentShare), timeoutMs);
  }

  async expectMigrationInsightsSalesforceLikeCommentShareCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.migrationInsightsSalesforceLikeCommentShare), count, timeoutMs);
  }

  async scrollMigrationInsightsSalesforceLikeCommentShareIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.migrationInsightsSalesforceLikeCommentShare));
  }

  async doubleClickHttpsKronosSharepointComWRTeamsCxOpsLayouts15DocAspxSourcedoc7BDC0510DD06E04A86BD11F2731DFEAAF07DFileMigration20Insights20Salesforce20FAQDocxActionDefaultMobileredirectTrue20Web1Cid9c9e5ebeD5974e47B1a556b4cd142ef8(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.httpsKronosSharepointComWRTeamsCxOpsLayouts15DocAspxSourcedoc7BDC0510DD06E04A86BD11F2731DFEAAF07DFileMigration20Insights20Salesforce20FAQDocxActionDefaultMobileredirectTrue20Web1Cid9c9e5ebeD5974e47B1a556b4cd142ef8));
  }

  async longPressHttpsKronosSharepointComWRTeamsCxOpsLayouts15DocAspxSourcedoc7BDC0510DD06E04A86BD11F2731DFEAAF07DFileMigration20Insights20Salesforce20FAQDocxActionDefaultMobileredirectTrue20Web1Cid9c9e5ebeD5974e47B1a556b4cd142ef8(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.httpsKronosSharepointComWRTeamsCxOpsLayouts15DocAspxSourcedoc7BDC0510DD06E04A86BD11F2731DFEAAF07DFileMigration20Insights20Salesforce20FAQDocxActionDefaultMobileredirectTrue20Web1Cid9c9e5ebeD5974e47B1a556b4cd142ef8));
  }

  async expectHttpsKronosSharepointComWRTeamsCxOpsLayouts15DocAspxSourcedoc7BDC0510DD06E04A86BD11F2731DFEAAF07DFileMigration20Insights20Salesforce20FAQDocxActionDefaultMobileredirectTrue20Web1Cid9c9e5ebeD5974e47B1a556b4cd142ef8Hidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.httpsKronosSharepointComWRTeamsCxOpsLayouts15DocAspxSourcedoc7BDC0510DD06E04A86BD11F2731DFEAAF07DFileMigration20Insights20Salesforce20FAQDocxActionDefaultMobileredirectTrue20Web1Cid9c9e5ebeD5974e47B1a556b4cd142ef8), timeoutMs);
  }

  async expectHttpsKronosSharepointComWRTeamsCxOpsLayouts15DocAspxSourcedoc7BDC0510DD06E04A86BD11F2731DFEAAF07DFileMigration20Insights20Salesforce20FAQDocxActionDefaultMobileredirectTrue20Web1Cid9c9e5ebeD5974e47B1a556b4cd142ef8Text(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.httpsKronosSharepointComWRTeamsCxOpsLayouts15DocAspxSourcedoc7BDC0510DD06E04A86BD11F2731DFEAAF07DFileMigration20Insights20Salesforce20FAQDocxActionDefaultMobileredirectTrue20Web1Cid9c9e5ebeD5974e47B1a556b4cd142ef8), expected, timeoutMs);
  }

  async expectHttpsKronosSharepointComWRTeamsCxOpsLayouts15DocAspxSourcedoc7BDC0510DD06E04A86BD11F2731DFEAAF07DFileMigration20Insights20Salesforce20FAQDocxActionDefaultMobileredirectTrue20Web1Cid9c9e5ebeD5974e47B1a556b4cd142ef8ContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.httpsKronosSharepointComWRTeamsCxOpsLayouts15DocAspxSourcedoc7BDC0510DD06E04A86BD11F2731DFEAAF07DFileMigration20Insights20Salesforce20FAQDocxActionDefaultMobileredirectTrue20Web1Cid9c9e5ebeD5974e47B1a556b4cd142ef8), substring, timeoutMs);
  }

  async expectHttpsKronosSharepointComWRTeamsCxOpsLayouts15DocAspxSourcedoc7BDC0510DD06E04A86BD11F2731DFEAAF07DFileMigration20Insights20Salesforce20FAQDocxActionDefaultMobileredirectTrue20Web1Cid9c9e5ebeD5974e47B1a556b4cd142ef8Value(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.httpsKronosSharepointComWRTeamsCxOpsLayouts15DocAspxSourcedoc7BDC0510DD06E04A86BD11F2731DFEAAF07DFileMigration20Insights20Salesforce20FAQDocxActionDefaultMobileredirectTrue20Web1Cid9c9e5ebeD5974e47B1a556b4cd142ef8), value, timeoutMs);
  }

  async expectHttpsKronosSharepointComWRTeamsCxOpsLayouts15DocAspxSourcedoc7BDC0510DD06E04A86BD11F2731DFEAAF07DFileMigration20Insights20Salesforce20FAQDocxActionDefaultMobileredirectTrue20Web1Cid9c9e5ebeD5974e47B1a556b4cd142ef8Enabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.httpsKronosSharepointComWRTeamsCxOpsLayouts15DocAspxSourcedoc7BDC0510DD06E04A86BD11F2731DFEAAF07DFileMigration20Insights20Salesforce20FAQDocxActionDefaultMobileredirectTrue20Web1Cid9c9e5ebeD5974e47B1a556b4cd142ef8), timeoutMs);
  }

  async expectHttpsKronosSharepointComWRTeamsCxOpsLayouts15DocAspxSourcedoc7BDC0510DD06E04A86BD11F2731DFEAAF07DFileMigration20Insights20Salesforce20FAQDocxActionDefaultMobileredirectTrue20Web1Cid9c9e5ebeD5974e47B1a556b4cd142ef8Disabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.httpsKronosSharepointComWRTeamsCxOpsLayouts15DocAspxSourcedoc7BDC0510DD06E04A86BD11F2731DFEAAF07DFileMigration20Insights20Salesforce20FAQDocxActionDefaultMobileredirectTrue20Web1Cid9c9e5ebeD5974e47B1a556b4cd142ef8), timeoutMs);
  }

  async expectHttpsKronosSharepointComWRTeamsCxOpsLayouts15DocAspxSourcedoc7BDC0510DD06E04A86BD11F2731DFEAAF07DFileMigration20Insights20Salesforce20FAQDocxActionDefaultMobileredirectTrue20Web1Cid9c9e5ebeD5974e47B1a556b4cd142ef8Checked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.httpsKronosSharepointComWRTeamsCxOpsLayouts15DocAspxSourcedoc7BDC0510DD06E04A86BD11F2731DFEAAF07DFileMigration20Insights20Salesforce20FAQDocxActionDefaultMobileredirectTrue20Web1Cid9c9e5ebeD5974e47B1a556b4cd142ef8), timeoutMs);
  }

  async expectHttpsKronosSharepointComWRTeamsCxOpsLayouts15DocAspxSourcedoc7BDC0510DD06E04A86BD11F2731DFEAAF07DFileMigration20Insights20Salesforce20FAQDocxActionDefaultMobileredirectTrue20Web1Cid9c9e5ebeD5974e47B1a556b4cd142ef8Unchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.httpsKronosSharepointComWRTeamsCxOpsLayouts15DocAspxSourcedoc7BDC0510DD06E04A86BD11F2731DFEAAF07DFileMigration20Insights20Salesforce20FAQDocxActionDefaultMobileredirectTrue20Web1Cid9c9e5ebeD5974e47B1a556b4cd142ef8), timeoutMs);
  }

  async expectHttpsKronosSharepointComWRTeamsCxOpsLayouts15DocAspxSourcedoc7BDC0510DD06E04A86BD11F2731DFEAAF07DFileMigration20Insights20Salesforce20FAQDocxActionDefaultMobileredirectTrue20Web1Cid9c9e5ebeD5974e47B1a556b4cd142ef8Focused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.httpsKronosSharepointComWRTeamsCxOpsLayouts15DocAspxSourcedoc7BDC0510DD06E04A86BD11F2731DFEAAF07DFileMigration20Insights20Salesforce20FAQDocxActionDefaultMobileredirectTrue20Web1Cid9c9e5ebeD5974e47B1a556b4cd142ef8), timeoutMs);
  }

  async expectHttpsKronosSharepointComWRTeamsCxOpsLayouts15DocAspxSourcedoc7BDC0510DD06E04A86BD11F2731DFEAAF07DFileMigration20Insights20Salesforce20FAQDocxActionDefaultMobileredirectTrue20Web1Cid9c9e5ebeD5974e47B1a556b4cd142ef8Count(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.httpsKronosSharepointComWRTeamsCxOpsLayouts15DocAspxSourcedoc7BDC0510DD06E04A86BD11F2731DFEAAF07DFileMigration20Insights20Salesforce20FAQDocxActionDefaultMobileredirectTrue20Web1Cid9c9e5ebeD5974e47B1a556b4cd142ef8), count, timeoutMs);
  }

  async scrollHttpsKronosSharepointComWRTeamsCxOpsLayouts15DocAspxSourcedoc7BDC0510DD06E04A86BD11F2731DFEAAF07DFileMigration20Insights20Salesforce20FAQDocxActionDefaultMobileredirectTrue20Web1Cid9c9e5ebeD5974e47B1a556b4cd142ef8IntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.httpsKronosSharepointComWRTeamsCxOpsLayouts15DocAspxSourcedoc7BDC0510DD06E04A86BD11F2731DFEAAF07DFileMigration20Insights20Salesforce20FAQDocxActionDefaultMobileredirectTrue20Web1Cid9c9e5ebeD5974e47B1a556b4cd142ef8));
  }

  async clickMigrationInsightsSalesforceOnePager(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.migrationInsightsSalesforceOnePager));
  }

  async doubleClickMigrationInsightsSalesforceOnePager(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.migrationInsightsSalesforceOnePager));
  }

  async longPressMigrationInsightsSalesforceOnePager(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.migrationInsightsSalesforceOnePager));
  }

  async expectMigrationInsightsSalesforceOnePagerHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.migrationInsightsSalesforceOnePager), timeoutMs);
  }

  async expectMigrationInsightsSalesforceOnePagerText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.migrationInsightsSalesforceOnePager), expected, timeoutMs);
  }

  async expectMigrationInsightsSalesforceOnePagerContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.migrationInsightsSalesforceOnePager), substring, timeoutMs);
  }

  async expectMigrationInsightsSalesforceOnePagerValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.migrationInsightsSalesforceOnePager), value, timeoutMs);
  }

  async expectMigrationInsightsSalesforceOnePagerEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.migrationInsightsSalesforceOnePager), timeoutMs);
  }

  async expectMigrationInsightsSalesforceOnePagerDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.migrationInsightsSalesforceOnePager), timeoutMs);
  }

  async expectMigrationInsightsSalesforceOnePagerChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.migrationInsightsSalesforceOnePager), timeoutMs);
  }

  async expectMigrationInsightsSalesforceOnePagerUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.migrationInsightsSalesforceOnePager), timeoutMs);
  }

  async expectMigrationInsightsSalesforceOnePagerFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.migrationInsightsSalesforceOnePager), timeoutMs);
  }

  async expectMigrationInsightsSalesforceOnePagerCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.migrationInsightsSalesforceOnePager), count, timeoutMs);
  }

  async scrollMigrationInsightsSalesforceOnePagerIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.migrationInsightsSalesforceOnePager));
  }

  async doubleClickHttpsKronosSharepointComPRTeamsCxOpsLayouts15DocAspxSourcedoc7BAD69AC5798EE43ADB3C27895148D096A7DFileMigration20Insights20Salesforce20OnePager201PptxActionEditMobileredirectTrueWeb1CidCfa355b5C3f14cbaAf09C6a2872a02a5(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.httpsKronosSharepointComPRTeamsCxOpsLayouts15DocAspxSourcedoc7BAD69AC5798EE43ADB3C27895148D096A7DFileMigration20Insights20Salesforce20OnePager201PptxActionEditMobileredirectTrueWeb1CidCfa355b5C3f14cbaAf09C6a2872a02a5));
  }

  async longPressHttpsKronosSharepointComPRTeamsCxOpsLayouts15DocAspxSourcedoc7BAD69AC5798EE43ADB3C27895148D096A7DFileMigration20Insights20Salesforce20OnePager201PptxActionEditMobileredirectTrueWeb1CidCfa355b5C3f14cbaAf09C6a2872a02a5(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.httpsKronosSharepointComPRTeamsCxOpsLayouts15DocAspxSourcedoc7BAD69AC5798EE43ADB3C27895148D096A7DFileMigration20Insights20Salesforce20OnePager201PptxActionEditMobileredirectTrueWeb1CidCfa355b5C3f14cbaAf09C6a2872a02a5));
  }

  async expectHttpsKronosSharepointComPRTeamsCxOpsLayouts15DocAspxSourcedoc7BAD69AC5798EE43ADB3C27895148D096A7DFileMigration20Insights20Salesforce20OnePager201PptxActionEditMobileredirectTrueWeb1CidCfa355b5C3f14cbaAf09C6a2872a02a5Hidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.httpsKronosSharepointComPRTeamsCxOpsLayouts15DocAspxSourcedoc7BAD69AC5798EE43ADB3C27895148D096A7DFileMigration20Insights20Salesforce20OnePager201PptxActionEditMobileredirectTrueWeb1CidCfa355b5C3f14cbaAf09C6a2872a02a5), timeoutMs);
  }

  async expectHttpsKronosSharepointComPRTeamsCxOpsLayouts15DocAspxSourcedoc7BAD69AC5798EE43ADB3C27895148D096A7DFileMigration20Insights20Salesforce20OnePager201PptxActionEditMobileredirectTrueWeb1CidCfa355b5C3f14cbaAf09C6a2872a02a5Text(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.httpsKronosSharepointComPRTeamsCxOpsLayouts15DocAspxSourcedoc7BAD69AC5798EE43ADB3C27895148D096A7DFileMigration20Insights20Salesforce20OnePager201PptxActionEditMobileredirectTrueWeb1CidCfa355b5C3f14cbaAf09C6a2872a02a5), expected, timeoutMs);
  }

  async expectHttpsKronosSharepointComPRTeamsCxOpsLayouts15DocAspxSourcedoc7BAD69AC5798EE43ADB3C27895148D096A7DFileMigration20Insights20Salesforce20OnePager201PptxActionEditMobileredirectTrueWeb1CidCfa355b5C3f14cbaAf09C6a2872a02a5ContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.httpsKronosSharepointComPRTeamsCxOpsLayouts15DocAspxSourcedoc7BAD69AC5798EE43ADB3C27895148D096A7DFileMigration20Insights20Salesforce20OnePager201PptxActionEditMobileredirectTrueWeb1CidCfa355b5C3f14cbaAf09C6a2872a02a5), substring, timeoutMs);
  }

  async expectHttpsKronosSharepointComPRTeamsCxOpsLayouts15DocAspxSourcedoc7BAD69AC5798EE43ADB3C27895148D096A7DFileMigration20Insights20Salesforce20OnePager201PptxActionEditMobileredirectTrueWeb1CidCfa355b5C3f14cbaAf09C6a2872a02a5Value(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.httpsKronosSharepointComPRTeamsCxOpsLayouts15DocAspxSourcedoc7BAD69AC5798EE43ADB3C27895148D096A7DFileMigration20Insights20Salesforce20OnePager201PptxActionEditMobileredirectTrueWeb1CidCfa355b5C3f14cbaAf09C6a2872a02a5), value, timeoutMs);
  }

  async expectHttpsKronosSharepointComPRTeamsCxOpsLayouts15DocAspxSourcedoc7BAD69AC5798EE43ADB3C27895148D096A7DFileMigration20Insights20Salesforce20OnePager201PptxActionEditMobileredirectTrueWeb1CidCfa355b5C3f14cbaAf09C6a2872a02a5Enabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.httpsKronosSharepointComPRTeamsCxOpsLayouts15DocAspxSourcedoc7BAD69AC5798EE43ADB3C27895148D096A7DFileMigration20Insights20Salesforce20OnePager201PptxActionEditMobileredirectTrueWeb1CidCfa355b5C3f14cbaAf09C6a2872a02a5), timeoutMs);
  }

  async expectHttpsKronosSharepointComPRTeamsCxOpsLayouts15DocAspxSourcedoc7BAD69AC5798EE43ADB3C27895148D096A7DFileMigration20Insights20Salesforce20OnePager201PptxActionEditMobileredirectTrueWeb1CidCfa355b5C3f14cbaAf09C6a2872a02a5Disabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.httpsKronosSharepointComPRTeamsCxOpsLayouts15DocAspxSourcedoc7BAD69AC5798EE43ADB3C27895148D096A7DFileMigration20Insights20Salesforce20OnePager201PptxActionEditMobileredirectTrueWeb1CidCfa355b5C3f14cbaAf09C6a2872a02a5), timeoutMs);
  }

  async expectHttpsKronosSharepointComPRTeamsCxOpsLayouts15DocAspxSourcedoc7BAD69AC5798EE43ADB3C27895148D096A7DFileMigration20Insights20Salesforce20OnePager201PptxActionEditMobileredirectTrueWeb1CidCfa355b5C3f14cbaAf09C6a2872a02a5Checked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.httpsKronosSharepointComPRTeamsCxOpsLayouts15DocAspxSourcedoc7BAD69AC5798EE43ADB3C27895148D096A7DFileMigration20Insights20Salesforce20OnePager201PptxActionEditMobileredirectTrueWeb1CidCfa355b5C3f14cbaAf09C6a2872a02a5), timeoutMs);
  }

  async expectHttpsKronosSharepointComPRTeamsCxOpsLayouts15DocAspxSourcedoc7BAD69AC5798EE43ADB3C27895148D096A7DFileMigration20Insights20Salesforce20OnePager201PptxActionEditMobileredirectTrueWeb1CidCfa355b5C3f14cbaAf09C6a2872a02a5Unchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.httpsKronosSharepointComPRTeamsCxOpsLayouts15DocAspxSourcedoc7BAD69AC5798EE43ADB3C27895148D096A7DFileMigration20Insights20Salesforce20OnePager201PptxActionEditMobileredirectTrueWeb1CidCfa355b5C3f14cbaAf09C6a2872a02a5), timeoutMs);
  }

  async expectHttpsKronosSharepointComPRTeamsCxOpsLayouts15DocAspxSourcedoc7BAD69AC5798EE43ADB3C27895148D096A7DFileMigration20Insights20Salesforce20OnePager201PptxActionEditMobileredirectTrueWeb1CidCfa355b5C3f14cbaAf09C6a2872a02a5Focused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.httpsKronosSharepointComPRTeamsCxOpsLayouts15DocAspxSourcedoc7BAD69AC5798EE43ADB3C27895148D096A7DFileMigration20Insights20Salesforce20OnePager201PptxActionEditMobileredirectTrueWeb1CidCfa355b5C3f14cbaAf09C6a2872a02a5), timeoutMs);
  }

  async expectHttpsKronosSharepointComPRTeamsCxOpsLayouts15DocAspxSourcedoc7BAD69AC5798EE43ADB3C27895148D096A7DFileMigration20Insights20Salesforce20OnePager201PptxActionEditMobileredirectTrueWeb1CidCfa355b5C3f14cbaAf09C6a2872a02a5Count(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.httpsKronosSharepointComPRTeamsCxOpsLayouts15DocAspxSourcedoc7BAD69AC5798EE43ADB3C27895148D096A7DFileMigration20Insights20Salesforce20OnePager201PptxActionEditMobileredirectTrueWeb1CidCfa355b5C3f14cbaAf09C6a2872a02a5), count, timeoutMs);
  }

  async scrollHttpsKronosSharepointComPRTeamsCxOpsLayouts15DocAspxSourcedoc7BAD69AC5798EE43ADB3C27895148D096A7DFileMigration20Insights20Salesforce20OnePager201PptxActionEditMobileredirectTrueWeb1CidCfa355b5C3f14cbaAf09C6a2872a02a5IntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.httpsKronosSharepointComPRTeamsCxOpsLayouts15DocAspxSourcedoc7BAD69AC5798EE43ADB3C27895148D096A7DFileMigration20Insights20Salesforce20OnePager201PptxActionEditMobileredirectTrueWeb1CidCfa355b5C3f14cbaAf09C6a2872a02a5));
  }

  async clickMigrationInsightsSalesforceTraining(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.migrationInsightsSalesforceTraining));
  }

  async doubleClickMigrationInsightsSalesforceTraining(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.migrationInsightsSalesforceTraining));
  }

  async longPressMigrationInsightsSalesforceTraining(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.migrationInsightsSalesforceTraining));
  }

  async expectMigrationInsightsSalesforceTrainingHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.migrationInsightsSalesforceTraining), timeoutMs);
  }

  async expectMigrationInsightsSalesforceTrainingText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.migrationInsightsSalesforceTraining), expected, timeoutMs);
  }

  async expectMigrationInsightsSalesforceTrainingContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.migrationInsightsSalesforceTraining), substring, timeoutMs);
  }

  async expectMigrationInsightsSalesforceTrainingValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.migrationInsightsSalesforceTraining), value, timeoutMs);
  }

  async expectMigrationInsightsSalesforceTrainingEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.migrationInsightsSalesforceTraining), timeoutMs);
  }

  async expectMigrationInsightsSalesforceTrainingDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.migrationInsightsSalesforceTraining), timeoutMs);
  }

  async expectMigrationInsightsSalesforceTrainingChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.migrationInsightsSalesforceTraining), timeoutMs);
  }

  async expectMigrationInsightsSalesforceTrainingUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.migrationInsightsSalesforceTraining), timeoutMs);
  }

  async expectMigrationInsightsSalesforceTrainingFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.migrationInsightsSalesforceTraining), timeoutMs);
  }

  async expectMigrationInsightsSalesforceTrainingCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.migrationInsightsSalesforceTraining), count, timeoutMs);
  }

  async scrollMigrationInsightsSalesforceTrainingIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.migrationInsightsSalesforceTraining));
  }

  async doubleClickHttpsWebMicrosoftstreamComVideoC80f4f72F6834aa1977811a8d234f11cReferrerHttps2F2FkronosSharepointCom2F(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.httpsWebMicrosoftstreamComVideoC80f4f72F6834aa1977811a8d234f11cReferrerHttps2F2FkronosSharepointCom2F));
  }

  async longPressHttpsWebMicrosoftstreamComVideoC80f4f72F6834aa1977811a8d234f11cReferrerHttps2F2FkronosSharepointCom2F(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.httpsWebMicrosoftstreamComVideoC80f4f72F6834aa1977811a8d234f11cReferrerHttps2F2FkronosSharepointCom2F));
  }

  async expectHttpsWebMicrosoftstreamComVideoC80f4f72F6834aa1977811a8d234f11cReferrerHttps2F2FkronosSharepointCom2FHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.httpsWebMicrosoftstreamComVideoC80f4f72F6834aa1977811a8d234f11cReferrerHttps2F2FkronosSharepointCom2F), timeoutMs);
  }

  async expectHttpsWebMicrosoftstreamComVideoC80f4f72F6834aa1977811a8d234f11cReferrerHttps2F2FkronosSharepointCom2FText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.httpsWebMicrosoftstreamComVideoC80f4f72F6834aa1977811a8d234f11cReferrerHttps2F2FkronosSharepointCom2F), expected, timeoutMs);
  }

  async expectHttpsWebMicrosoftstreamComVideoC80f4f72F6834aa1977811a8d234f11cReferrerHttps2F2FkronosSharepointCom2FContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.httpsWebMicrosoftstreamComVideoC80f4f72F6834aa1977811a8d234f11cReferrerHttps2F2FkronosSharepointCom2F), substring, timeoutMs);
  }

  async expectHttpsWebMicrosoftstreamComVideoC80f4f72F6834aa1977811a8d234f11cReferrerHttps2F2FkronosSharepointCom2FValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.httpsWebMicrosoftstreamComVideoC80f4f72F6834aa1977811a8d234f11cReferrerHttps2F2FkronosSharepointCom2F), value, timeoutMs);
  }

  async expectHttpsWebMicrosoftstreamComVideoC80f4f72F6834aa1977811a8d234f11cReferrerHttps2F2FkronosSharepointCom2FEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.httpsWebMicrosoftstreamComVideoC80f4f72F6834aa1977811a8d234f11cReferrerHttps2F2FkronosSharepointCom2F), timeoutMs);
  }

  async expectHttpsWebMicrosoftstreamComVideoC80f4f72F6834aa1977811a8d234f11cReferrerHttps2F2FkronosSharepointCom2FDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.httpsWebMicrosoftstreamComVideoC80f4f72F6834aa1977811a8d234f11cReferrerHttps2F2FkronosSharepointCom2F), timeoutMs);
  }

  async expectHttpsWebMicrosoftstreamComVideoC80f4f72F6834aa1977811a8d234f11cReferrerHttps2F2FkronosSharepointCom2FChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.httpsWebMicrosoftstreamComVideoC80f4f72F6834aa1977811a8d234f11cReferrerHttps2F2FkronosSharepointCom2F), timeoutMs);
  }

  async expectHttpsWebMicrosoftstreamComVideoC80f4f72F6834aa1977811a8d234f11cReferrerHttps2F2FkronosSharepointCom2FUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.httpsWebMicrosoftstreamComVideoC80f4f72F6834aa1977811a8d234f11cReferrerHttps2F2FkronosSharepointCom2F), timeoutMs);
  }

  async expectHttpsWebMicrosoftstreamComVideoC80f4f72F6834aa1977811a8d234f11cReferrerHttps2F2FkronosSharepointCom2FFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.httpsWebMicrosoftstreamComVideoC80f4f72F6834aa1977811a8d234f11cReferrerHttps2F2FkronosSharepointCom2F), timeoutMs);
  }

  async expectHttpsWebMicrosoftstreamComVideoC80f4f72F6834aa1977811a8d234f11cReferrerHttps2F2FkronosSharepointCom2FCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.httpsWebMicrosoftstreamComVideoC80f4f72F6834aa1977811a8d234f11cReferrerHttps2F2FkronosSharepointCom2F), count, timeoutMs);
  }

  async scrollHttpsWebMicrosoftstreamComVideoC80f4f72F6834aa1977811a8d234f11cReferrerHttps2F2FkronosSharepointCom2FIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.httpsWebMicrosoftstreamComVideoC80f4f72F6834aa1977811a8d234f11cReferrerHttps2F2FkronosSharepointCom2F));
  }

  async clickReadyMadeMigrationInsightsSalesforce(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.readyMadeMigrationInsightsSalesforce));
  }

  async doubleClickReadyMadeMigrationInsightsSalesforce(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.readyMadeMigrationInsightsSalesforce));
  }

  async longPressReadyMadeMigrationInsightsSalesforce(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.readyMadeMigrationInsightsSalesforce));
  }

  async expectReadyMadeMigrationInsightsSalesforceHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.readyMadeMigrationInsightsSalesforce), timeoutMs);
  }

  async expectReadyMadeMigrationInsightsSalesforceText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.readyMadeMigrationInsightsSalesforce), expected, timeoutMs);
  }

  async expectReadyMadeMigrationInsightsSalesforceContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.readyMadeMigrationInsightsSalesforce), substring, timeoutMs);
  }

  async expectReadyMadeMigrationInsightsSalesforceValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.readyMadeMigrationInsightsSalesforce), value, timeoutMs);
  }

  async expectReadyMadeMigrationInsightsSalesforceEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.readyMadeMigrationInsightsSalesforce), timeoutMs);
  }

  async expectReadyMadeMigrationInsightsSalesforceDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.readyMadeMigrationInsightsSalesforce), timeoutMs);
  }

  async expectReadyMadeMigrationInsightsSalesforceChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.readyMadeMigrationInsightsSalesforce), timeoutMs);
  }

  async expectReadyMadeMigrationInsightsSalesforceUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.readyMadeMigrationInsightsSalesforce), timeoutMs);
  }

  async expectReadyMadeMigrationInsightsSalesforceFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.readyMadeMigrationInsightsSalesforce), timeoutMs);
  }

  async expectReadyMadeMigrationInsightsSalesforceCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.readyMadeMigrationInsightsSalesforce), count, timeoutMs);
  }

  async scrollReadyMadeMigrationInsightsSalesforceIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.readyMadeMigrationInsightsSalesforce));
  }

  async clickReadyMadeMigrationInsights(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.readyMadeMigrationInsights));
  }

  async doubleClickReadyMadeMigrationInsights(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.readyMadeMigrationInsights));
  }

  async longPressReadyMadeMigrationInsights(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.readyMadeMigrationInsights));
  }

  async expectReadyMadeMigrationInsightsHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.readyMadeMigrationInsights), timeoutMs);
  }

  async expectReadyMadeMigrationInsightsText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.readyMadeMigrationInsights), expected, timeoutMs);
  }

  async expectReadyMadeMigrationInsightsContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.readyMadeMigrationInsights), substring, timeoutMs);
  }

  async expectReadyMadeMigrationInsightsValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.readyMadeMigrationInsights), value, timeoutMs);
  }

  async expectReadyMadeMigrationInsightsEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.readyMadeMigrationInsights), timeoutMs);
  }

  async expectReadyMadeMigrationInsightsDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.readyMadeMigrationInsights), timeoutMs);
  }

  async expectReadyMadeMigrationInsightsChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.readyMadeMigrationInsights), timeoutMs);
  }

  async expectReadyMadeMigrationInsightsUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.readyMadeMigrationInsights), timeoutMs);
  }

  async expectReadyMadeMigrationInsightsFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.readyMadeMigrationInsights), timeoutMs);
  }

  async expectReadyMadeMigrationInsightsCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.readyMadeMigrationInsights), count, timeoutMs);
  }

  async scrollReadyMadeMigrationInsightsIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.readyMadeMigrationInsights));
  }

  async doubleClickHttpsKronosLightningForceComLightningRReport00O4M0000045NuOUAUView(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.httpsKronosLightningForceComLightningRReport00O4M0000045NuOUAUView));
  }

  async longPressHttpsKronosLightningForceComLightningRReport00O4M0000045NuOUAUView(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.httpsKronosLightningForceComLightningRReport00O4M0000045NuOUAUView));
  }

  async expectHttpsKronosLightningForceComLightningRReport00O4M0000045NuOUAUViewHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.httpsKronosLightningForceComLightningRReport00O4M0000045NuOUAUView), timeoutMs);
  }

  async expectHttpsKronosLightningForceComLightningRReport00O4M0000045NuOUAUViewText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.httpsKronosLightningForceComLightningRReport00O4M0000045NuOUAUView), expected, timeoutMs);
  }

  async expectHttpsKronosLightningForceComLightningRReport00O4M0000045NuOUAUViewContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.httpsKronosLightningForceComLightningRReport00O4M0000045NuOUAUView), substring, timeoutMs);
  }

  async expectHttpsKronosLightningForceComLightningRReport00O4M0000045NuOUAUViewValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.httpsKronosLightningForceComLightningRReport00O4M0000045NuOUAUView), value, timeoutMs);
  }

  async expectHttpsKronosLightningForceComLightningRReport00O4M0000045NuOUAUViewEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.httpsKronosLightningForceComLightningRReport00O4M0000045NuOUAUView), timeoutMs);
  }

  async expectHttpsKronosLightningForceComLightningRReport00O4M0000045NuOUAUViewDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.httpsKronosLightningForceComLightningRReport00O4M0000045NuOUAUView), timeoutMs);
  }

  async expectHttpsKronosLightningForceComLightningRReport00O4M0000045NuOUAUViewChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.httpsKronosLightningForceComLightningRReport00O4M0000045NuOUAUView), timeoutMs);
  }

  async expectHttpsKronosLightningForceComLightningRReport00O4M0000045NuOUAUViewUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.httpsKronosLightningForceComLightningRReport00O4M0000045NuOUAUView), timeoutMs);
  }

  async expectHttpsKronosLightningForceComLightningRReport00O4M0000045NuOUAUViewFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.httpsKronosLightningForceComLightningRReport00O4M0000045NuOUAUView), timeoutMs);
  }

  async expectHttpsKronosLightningForceComLightningRReport00O4M0000045NuOUAUViewCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.httpsKronosLightningForceComLightningRReport00O4M0000045NuOUAUView), count, timeoutMs);
  }

  async scrollHttpsKronosLightningForceComLightningRReport00O4M0000045NuOUAUViewIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.httpsKronosLightningForceComLightningRReport00O4M0000045NuOUAUView));
  }

  async clickWeReHereToHelpLikeCommentShare(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.weReHereToHelpLikeCommentShare));
  }

  async doubleClickWeReHereToHelpLikeCommentShare(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.weReHereToHelpLikeCommentShare));
  }

  async longPressWeReHereToHelpLikeCommentShare(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.weReHereToHelpLikeCommentShare));
  }

  async expectWeReHereToHelpLikeCommentShareHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.weReHereToHelpLikeCommentShare), timeoutMs);
  }

  async expectWeReHereToHelpLikeCommentShareText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.weReHereToHelpLikeCommentShare), expected, timeoutMs);
  }

  async expectWeReHereToHelpLikeCommentShareContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.weReHereToHelpLikeCommentShare), substring, timeoutMs);
  }

  async expectWeReHereToHelpLikeCommentShareValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.weReHereToHelpLikeCommentShare), value, timeoutMs);
  }

  async expectWeReHereToHelpLikeCommentShareEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.weReHereToHelpLikeCommentShare), timeoutMs);
  }

  async expectWeReHereToHelpLikeCommentShareDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.weReHereToHelpLikeCommentShare), timeoutMs);
  }

  async expectWeReHereToHelpLikeCommentShareChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.weReHereToHelpLikeCommentShare), timeoutMs);
  }

  async expectWeReHereToHelpLikeCommentShareUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.weReHereToHelpLikeCommentShare), timeoutMs);
  }

  async expectWeReHereToHelpLikeCommentShareFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.weReHereToHelpLikeCommentShare), timeoutMs);
  }

  async expectWeReHereToHelpLikeCommentShareCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.weReHereToHelpLikeCommentShare), count, timeoutMs);
  }

  async scrollWeReHereToHelpLikeCommentShareIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.weReHereToHelpLikeCommentShare));
  }

  async doubleClickMigrationsUkgCom(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.migrationsUkgCom));
  }

  async longPressMigrationsUkgCom(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.migrationsUkgCom));
  }

  async expectMigrationsUkgComHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.migrationsUkgCom), timeoutMs);
  }

  async expectMigrationsUkgComText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.migrationsUkgCom), expected, timeoutMs);
  }

  async expectMigrationsUkgComContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.migrationsUkgCom), substring, timeoutMs);
  }

  async expectMigrationsUkgComValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.migrationsUkgCom), value, timeoutMs);
  }

  async expectMigrationsUkgComEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.migrationsUkgCom), timeoutMs);
  }

  async expectMigrationsUkgComDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.migrationsUkgCom), timeoutMs);
  }

  async expectMigrationsUkgComChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.migrationsUkgCom), timeoutMs);
  }

  async expectMigrationsUkgComUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.migrationsUkgCom), timeoutMs);
  }

  async expectMigrationsUkgComFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.migrationsUkgCom), timeoutMs);
  }

  async expectMigrationsUkgComCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.migrationsUkgCom), count, timeoutMs);
  }

  async scrollMigrationsUkgComIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.migrationsUkgCom));
  }

  async clickWithYourQuestionsOr(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.withYourQuestionsOr));
  }

  async doubleClickWithYourQuestionsOr(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.withYourQuestionsOr));
  }

  async longPressWithYourQuestionsOr(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.withYourQuestionsOr));
  }

  async expectWithYourQuestionsOrHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.withYourQuestionsOr), timeoutMs);
  }

  async expectWithYourQuestionsOrText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.withYourQuestionsOr), expected, timeoutMs);
  }

  async expectWithYourQuestionsOrContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.withYourQuestionsOr), substring, timeoutMs);
  }

  async expectWithYourQuestionsOrValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.withYourQuestionsOr), value, timeoutMs);
  }

  async expectWithYourQuestionsOrEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.withYourQuestionsOr), timeoutMs);
  }

  async expectWithYourQuestionsOrDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.withYourQuestionsOr), timeoutMs);
  }

  async expectWithYourQuestionsOrChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.withYourQuestionsOr), timeoutMs);
  }

  async expectWithYourQuestionsOrUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.withYourQuestionsOr), timeoutMs);
  }

  async expectWithYourQuestionsOrFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.withYourQuestionsOr), timeoutMs);
  }

  async expectWithYourQuestionsOrCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.withYourQuestionsOr), count, timeoutMs);
  }

  async scrollWithYourQuestionsOrIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.withYourQuestionsOr));
  }

  async clickWeLovedHearingFrom(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.weLovedHearingFrom));
  }

  async doubleClickWeLovedHearingFrom(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.weLovedHearingFrom));
  }

  async longPressWeLovedHearingFrom(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.weLovedHearingFrom));
  }

  async expectWeLovedHearingFromHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.weLovedHearingFrom), timeoutMs);
  }

  async expectWeLovedHearingFromText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.weLovedHearingFrom), expected, timeoutMs);
  }

  async expectWeLovedHearingFromContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.weLovedHearingFrom), substring, timeoutMs);
  }

  async expectWeLovedHearingFromValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.weLovedHearingFrom), value, timeoutMs);
  }

  async expectWeLovedHearingFromEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.weLovedHearingFrom), timeoutMs);
  }

  async expectWeLovedHearingFromDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.weLovedHearingFrom), timeoutMs);
  }

  async expectWeLovedHearingFromChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.weLovedHearingFrom), timeoutMs);
  }

  async expectWeLovedHearingFromUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.weLovedHearingFrom), timeoutMs);
  }

  async expectWeLovedHearingFromFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.weLovedHearingFrom), timeoutMs);
  }

  async expectWeLovedHearingFromCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.weLovedHearingFrom), count, timeoutMs);
  }

  async scrollWeLovedHearingFromIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.weLovedHearingFrom));
  }

  async clickJohnKellyMattDowling(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.johnKellyMattDowling));
  }

  async doubleClickJohnKellyMattDowling(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.johnKellyMattDowling));
  }

  async longPressJohnKellyMattDowling(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.johnKellyMattDowling));
  }

  async expectJohnKellyMattDowlingHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.johnKellyMattDowling), timeoutMs);
  }

  async expectJohnKellyMattDowlingText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.johnKellyMattDowling), expected, timeoutMs);
  }

  async expectJohnKellyMattDowlingContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.johnKellyMattDowling), substring, timeoutMs);
  }

  async expectJohnKellyMattDowlingValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.johnKellyMattDowling), value, timeoutMs);
  }

  async expectJohnKellyMattDowlingEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.johnKellyMattDowling), timeoutMs);
  }

  async expectJohnKellyMattDowlingDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.johnKellyMattDowling), timeoutMs);
  }

  async expectJohnKellyMattDowlingChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.johnKellyMattDowling), timeoutMs);
  }

  async expectJohnKellyMattDowlingUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.johnKellyMattDowling), timeoutMs);
  }

  async expectJohnKellyMattDowlingFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.johnKellyMattDowling), timeoutMs);
  }

  async expectJohnKellyMattDowlingCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.johnKellyMattDowling), count, timeoutMs);
  }

  async scrollJohnKellyMattDowlingIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.johnKellyMattDowling));
  }

  async doubleClickJohnKelly(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.johnKelly));
  }

  async longPressJohnKelly(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.johnKelly));
  }

  async expectJohnKellyHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.johnKelly), timeoutMs);
  }

  async expectJohnKellyText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.johnKelly), expected, timeoutMs);
  }

  async expectJohnKellyContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.johnKelly), substring, timeoutMs);
  }

  async expectJohnKellyValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.johnKelly), value, timeoutMs);
  }

  async expectJohnKellyEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.johnKelly), timeoutMs);
  }

  async expectJohnKellyDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.johnKelly), timeoutMs);
  }

  async expectJohnKellyChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.johnKelly), timeoutMs);
  }

  async expectJohnKellyUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.johnKelly), timeoutMs);
  }

  async expectJohnKellyFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.johnKelly), timeoutMs);
  }

  async expectJohnKellyCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.johnKelly), count, timeoutMs);
  }

  async scrollJohnKellyIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.johnKelly));
  }

  async doubleClickMattDowling(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.mattDowling));
  }

  async longPressMattDowling(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.mattDowling));
  }

  async expectMattDowlingHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.mattDowling), timeoutMs);
  }

  async expectMattDowlingText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.mattDowling), expected, timeoutMs);
  }

  async expectMattDowlingContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.mattDowling), substring, timeoutMs);
  }

  async expectMattDowlingValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.mattDowling), value, timeoutMs);
  }

  async expectMattDowlingEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.mattDowling), timeoutMs);
  }

  async expectMattDowlingDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.mattDowling), timeoutMs);
  }

  async expectMattDowlingChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.mattDowling), timeoutMs);
  }

  async expectMattDowlingUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.mattDowling), timeoutMs);
  }

  async expectMattDowlingFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.mattDowling), timeoutMs);
  }

  async expectMattDowlingCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.mattDowling), count, timeoutMs);
  }

  async scrollMattDowlingIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.mattDowling));
  }

  async doubleClickLisaPratt(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.lisaPratt));
  }

  async longPressLisaPratt(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.lisaPratt));
  }

  async expectLisaPrattHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.lisaPratt), timeoutMs);
  }

  async expectLisaPrattText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.lisaPratt), expected, timeoutMs);
  }

  async expectLisaPrattContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.lisaPratt), substring, timeoutMs);
  }

  async expectLisaPrattValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.lisaPratt), value, timeoutMs);
  }

  async expectLisaPrattEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.lisaPratt), timeoutMs);
  }

  async expectLisaPrattDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.lisaPratt), timeoutMs);
  }

  async expectLisaPrattChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.lisaPratt), timeoutMs);
  }

  async expectLisaPrattUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.lisaPratt), timeoutMs);
  }

  async expectLisaPrattFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.lisaPratt), timeoutMs);
  }

  async expectLisaPrattCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.lisaPratt), count, timeoutMs);
  }

  async scrollLisaPrattIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.lisaPratt));
  }

  async doubleClickCommentsLikeCommentShare3(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.commentsLikeCommentShare3));
  }

  async longPressCommentsLikeCommentShare3(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.commentsLikeCommentShare3));
  }

  async expectCommentsLikeCommentShare3Hidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.commentsLikeCommentShare3), timeoutMs);
  }

  async expectCommentsLikeCommentShare3Text(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.commentsLikeCommentShare3), expected, timeoutMs);
  }

  async expectCommentsLikeCommentShare3ContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.commentsLikeCommentShare3), substring, timeoutMs);
  }

  async expectCommentsLikeCommentShare3Value(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.commentsLikeCommentShare3), value, timeoutMs);
  }

  async expectCommentsLikeCommentShare3Enabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.commentsLikeCommentShare3), timeoutMs);
  }

  async expectCommentsLikeCommentShare3Disabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.commentsLikeCommentShare3), timeoutMs);
  }

  async expectCommentsLikeCommentShare3Checked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.commentsLikeCommentShare3), timeoutMs);
  }

  async expectCommentsLikeCommentShare3Unchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.commentsLikeCommentShare3), timeoutMs);
  }

  async expectCommentsLikeCommentShare3Focused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.commentsLikeCommentShare3), timeoutMs);
  }

  async expectCommentsLikeCommentShare3Count(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.commentsLikeCommentShare3), count, timeoutMs);
  }

  async scrollCommentsLikeCommentShare3IntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.commentsLikeCommentShare3));
  }

  async doubleClickSeenBy24LikeCommentShare(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.seenBy24LikeCommentShare));
  }

  async longPressSeenBy24LikeCommentShare(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.seenBy24LikeCommentShare));
  }

  async expectSeenBy24LikeCommentShareHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.seenBy24LikeCommentShare), timeoutMs);
  }

  async expectSeenBy24LikeCommentShareText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.seenBy24LikeCommentShare), expected, timeoutMs);
  }

  async expectSeenBy24LikeCommentShareContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.seenBy24LikeCommentShare), substring, timeoutMs);
  }

  async expectSeenBy24LikeCommentShareValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.seenBy24LikeCommentShare), value, timeoutMs);
  }

  async expectSeenBy24LikeCommentShareEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.seenBy24LikeCommentShare), timeoutMs);
  }

  async expectSeenBy24LikeCommentShareDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.seenBy24LikeCommentShare), timeoutMs);
  }

  async expectSeenBy24LikeCommentShareChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.seenBy24LikeCommentShare), timeoutMs);
  }

  async expectSeenBy24LikeCommentShareUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.seenBy24LikeCommentShare), timeoutMs);
  }

  async expectSeenBy24LikeCommentShareFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.seenBy24LikeCommentShare), timeoutMs);
  }

  async expectSeenBy24LikeCommentShareCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.seenBy24LikeCommentShare), count, timeoutMs);
  }

  async scrollSeenBy24LikeCommentShareIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.seenBy24LikeCommentShare));
  }

  async doubleClickRachelGonzales(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.rachelGonzales));
  }

  async longPressRachelGonzales(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.rachelGonzales));
  }

  async expectRachelGonzalesHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.rachelGonzales), timeoutMs);
  }

  async expectRachelGonzalesText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.rachelGonzales), expected, timeoutMs);
  }

  async expectRachelGonzalesContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.rachelGonzales), substring, timeoutMs);
  }

  async expectRachelGonzalesValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.rachelGonzales), value, timeoutMs);
  }

  async expectRachelGonzalesEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.rachelGonzales), timeoutMs);
  }

  async expectRachelGonzalesDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.rachelGonzales), timeoutMs);
  }

  async expectRachelGonzalesChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.rachelGonzales), timeoutMs);
  }

  async expectRachelGonzalesUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.rachelGonzales), timeoutMs);
  }

  async expectRachelGonzalesFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.rachelGonzales), timeoutMs);
  }

  async expectRachelGonzalesCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.rachelGonzales), count, timeoutMs);
  }

  async scrollRachelGonzalesIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.rachelGonzales));
  }

  async doubleClickOthersLikeCommentShare4(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.othersLikeCommentShare4));
  }

  async longPressOthersLikeCommentShare4(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.othersLikeCommentShare4));
  }

  async expectOthersLikeCommentShare4Hidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.othersLikeCommentShare4), timeoutMs);
  }

  async expectOthersLikeCommentShare4Text(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.othersLikeCommentShare4), expected, timeoutMs);
  }

  async expectOthersLikeCommentShare4ContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.othersLikeCommentShare4), substring, timeoutMs);
  }

  async expectOthersLikeCommentShare4Value(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.othersLikeCommentShare4), value, timeoutMs);
  }

  async expectOthersLikeCommentShare4Enabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.othersLikeCommentShare4), timeoutMs);
  }

  async expectOthersLikeCommentShare4Disabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.othersLikeCommentShare4), timeoutMs);
  }

  async expectOthersLikeCommentShare4Checked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.othersLikeCommentShare4), timeoutMs);
  }

  async expectOthersLikeCommentShare4Unchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.othersLikeCommentShare4), timeoutMs);
  }

  async expectOthersLikeCommentShare4Focused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.othersLikeCommentShare4), timeoutMs);
  }

  async expectOthersLikeCommentShare4Count(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.othersLikeCommentShare4), count, timeoutMs);
  }

  async scrollOthersLikeCommentShare4IntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.othersLikeCommentShare4));
  }

  async clickNancyBurdzel6Years(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.nancyBurdzel6Years));
  }

  async doubleClickNancyBurdzel6Years(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.nancyBurdzel6Years));
  }

  async longPressNancyBurdzel6Years(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.nancyBurdzel6Years));
  }

  async expectNancyBurdzel6YearsHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.nancyBurdzel6Years), timeoutMs);
  }

  async expectNancyBurdzel6YearsText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.nancyBurdzel6Years), expected, timeoutMs);
  }

  async expectNancyBurdzel6YearsContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.nancyBurdzel6Years), substring, timeoutMs);
  }

  async expectNancyBurdzel6YearsValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.nancyBurdzel6Years), value, timeoutMs);
  }

  async expectNancyBurdzel6YearsEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.nancyBurdzel6Years), timeoutMs);
  }

  async expectNancyBurdzel6YearsDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.nancyBurdzel6Years), timeoutMs);
  }

  async expectNancyBurdzel6YearsChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.nancyBurdzel6Years), timeoutMs);
  }

  async expectNancyBurdzel6YearsUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.nancyBurdzel6Years), timeoutMs);
  }

  async expectNancyBurdzel6YearsFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.nancyBurdzel6Years), timeoutMs);
  }

  async expectNancyBurdzel6YearsCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.nancyBurdzel6Years), count, timeoutMs);
  }

  async scrollNancyBurdzel6YearsIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.nancyBurdzel6Years));
  }

  async doubleClickNancyBurdzelLikeCommentShare3(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.nancyBurdzelLikeCommentShare3));
  }

  async longPressNancyBurdzelLikeCommentShare3(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.nancyBurdzelLikeCommentShare3));
  }

  async expectNancyBurdzelLikeCommentShare3Hidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.nancyBurdzelLikeCommentShare3), timeoutMs);
  }

  async expectNancyBurdzelLikeCommentShare3Text(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.nancyBurdzelLikeCommentShare3), expected, timeoutMs);
  }

  async expectNancyBurdzelLikeCommentShare3ContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.nancyBurdzelLikeCommentShare3), substring, timeoutMs);
  }

  async expectNancyBurdzelLikeCommentShare3Value(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.nancyBurdzelLikeCommentShare3), value, timeoutMs);
  }

  async expectNancyBurdzelLikeCommentShare3Enabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.nancyBurdzelLikeCommentShare3), timeoutMs);
  }

  async expectNancyBurdzelLikeCommentShare3Disabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.nancyBurdzelLikeCommentShare3), timeoutMs);
  }

  async expectNancyBurdzelLikeCommentShare3Checked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.nancyBurdzelLikeCommentShare3), timeoutMs);
  }

  async expectNancyBurdzelLikeCommentShare3Unchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.nancyBurdzelLikeCommentShare3), timeoutMs);
  }

  async expectNancyBurdzelLikeCommentShare3Focused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.nancyBurdzelLikeCommentShare3), timeoutMs);
  }

  async expectNancyBurdzelLikeCommentShare3Count(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.nancyBurdzelLikeCommentShare3), count, timeoutMs);
  }

  async scrollNancyBurdzelLikeCommentShare3IntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.nancyBurdzelLikeCommentShare3));
  }

  async clickBradVanAntwerpHere(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.bradVanAntwerpHere));
  }

  async doubleClickBradVanAntwerpHere(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.bradVanAntwerpHere));
  }

  async longPressBradVanAntwerpHere(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.bradVanAntwerpHere));
  }

  async expectBradVanAntwerpHereHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.bradVanAntwerpHere), timeoutMs);
  }

  async expectBradVanAntwerpHereText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.bradVanAntwerpHere), expected, timeoutMs);
  }

  async expectBradVanAntwerpHereContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.bradVanAntwerpHere), substring, timeoutMs);
  }

  async expectBradVanAntwerpHereValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.bradVanAntwerpHere), value, timeoutMs);
  }

  async expectBradVanAntwerpHereEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.bradVanAntwerpHere), timeoutMs);
  }

  async expectBradVanAntwerpHereDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.bradVanAntwerpHere), timeoutMs);
  }

  async expectBradVanAntwerpHereChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.bradVanAntwerpHere), timeoutMs);
  }

  async expectBradVanAntwerpHereUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.bradVanAntwerpHere), timeoutMs);
  }

  async expectBradVanAntwerpHereFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.bradVanAntwerpHere), timeoutMs);
  }

  async expectBradVanAntwerpHereCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.bradVanAntwerpHere), count, timeoutMs);
  }

  async scrollBradVanAntwerpHereIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.bradVanAntwerpHere));
  }

  async doubleClickBradVanAntwerp(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.bradVanAntwerp));
  }

  async longPressBradVanAntwerp(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.bradVanAntwerp));
  }

  async expectBradVanAntwerpHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.bradVanAntwerp), timeoutMs);
  }

  async expectBradVanAntwerpText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.bradVanAntwerp), expected, timeoutMs);
  }

  async expectBradVanAntwerpContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.bradVanAntwerp), substring, timeoutMs);
  }

  async expectBradVanAntwerpValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.bradVanAntwerp), value, timeoutMs);
  }

  async expectBradVanAntwerpEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.bradVanAntwerp), timeoutMs);
  }

  async expectBradVanAntwerpDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.bradVanAntwerp), timeoutMs);
  }

  async expectBradVanAntwerpChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.bradVanAntwerp), timeoutMs);
  }

  async expectBradVanAntwerpUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.bradVanAntwerp), timeoutMs);
  }

  async expectBradVanAntwerpFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.bradVanAntwerp), timeoutMs);
  }

  async expectBradVanAntwerpCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.bradVanAntwerp), count, timeoutMs);
  }

  async scrollBradVanAntwerpIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.bradVanAntwerp));
  }

  async clickHereAreSome(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.hereAreSome));
  }

  async doubleClickHereAreSome(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.hereAreSome));
  }

  async longPressHereAreSome(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.hereAreSome));
  }

  async expectHereAreSomeHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.hereAreSome), timeoutMs);
  }

  async expectHereAreSomeText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.hereAreSome), expected, timeoutMs);
  }

  async expectHereAreSomeContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.hereAreSome), substring, timeoutMs);
  }

  async expectHereAreSomeValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.hereAreSome), value, timeoutMs);
  }

  async expectHereAreSomeEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.hereAreSome), timeoutMs);
  }

  async expectHereAreSomeDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.hereAreSome), timeoutMs);
  }

  async expectHereAreSomeChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.hereAreSome), timeoutMs);
  }

  async expectHereAreSomeUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.hereAreSome), timeoutMs);
  }

  async expectHereAreSomeFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.hereAreSome), timeoutMs);
  }

  async expectHereAreSomeCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.hereAreSome), count, timeoutMs);
  }

  async scrollHereAreSomeIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.hereAreSome));
  }

  async longPressViewMorePosts(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.viewMorePosts));
  }

  async expectViewMorePostsHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.viewMorePosts), timeoutMs);
  }

  async expectViewMorePostsText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.viewMorePosts), expected, timeoutMs);
  }

  async expectViewMorePostsContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.viewMorePosts), substring, timeoutMs);
  }

  async expectViewMorePostsValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.viewMorePosts), value, timeoutMs);
  }

  async expectViewMorePostsEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.viewMorePosts), timeoutMs);
  }

  async expectViewMorePostsDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.viewMorePosts), timeoutMs);
  }

  async expectViewMorePostsChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.viewMorePosts), timeoutMs);
  }

  async expectViewMorePostsUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.viewMorePosts), timeoutMs);
  }

  async expectViewMorePostsFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.viewMorePosts), timeoutMs);
  }

  async expectViewMorePostsCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.viewMorePosts), count, timeoutMs);
  }

  async scrollViewMorePostsIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.viewMorePosts));
  }


  async clickAccountName(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.accountName));
  }

  async doubleClickAccountName(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.accountName));
  }

  async longPressAccountName(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.accountName));
  }

  async expectAccountNameVisible(timeoutMs = 30_000): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.accountName), timeoutMs);
  }

  async expectAccountNameHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.accountName), timeoutMs);
  }

  async expectAccountNameText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.accountName), expected, timeoutMs);
  }

  async expectAccountNameContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.accountName), substring, timeoutMs);
  }

  async expectAccountNameValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.accountName), value, timeoutMs);
  }

  async expectAccountNameEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.accountName), timeoutMs);
  }

  async expectAccountNameDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.accountName), timeoutMs);
  }

  async expectAccountNameChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.accountName), timeoutMs);
  }

  async expectAccountNameUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.accountName), timeoutMs);
  }

  async expectAccountNameFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.accountName), timeoutMs);
  }

  async expectAccountNameCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.accountName), count, timeoutMs);
  }

  async scrollAccountNameIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.accountName));
  }


  async clickLoginField(): Promise<void> {
    await clickWhenVisible(webLocator(this.page, HomePage.L.loginField));
  }

  async doubleClickLoginField(): Promise<void> {
    await doubleClickWhenVisible(webLocator(this.page, HomePage.L.loginField));
  }

  async longPressLoginField(): Promise<void> {
    await longPressWhenVisible(webLocator(this.page, HomePage.L.loginField));
  }

  async expectLoginFieldVisible(timeoutMs = 30_000): Promise<void> {
    await expectVisible(webLocator(this.page, HomePage.L.loginField), timeoutMs);
  }

  async expectLoginFieldHidden(timeoutMs = 30_000): Promise<void> {
    await expectHidden(webLocator(this.page, HomePage.L.loginField), timeoutMs);
  }

  async expectLoginFieldText(expected: string, timeoutMs = 30_000): Promise<void> {
    await expectText(webLocator(this.page, HomePage.L.loginField), expected, timeoutMs);
  }

  async expectLoginFieldContainsText(substring: string, timeoutMs = 30_000): Promise<void> {
    await expectContainsText(webLocator(this.page, HomePage.L.loginField), substring, timeoutMs);
  }

  async expectLoginFieldValue(value: string, timeoutMs = 30_000): Promise<void> {
    await expectValue(webLocator(this.page, HomePage.L.loginField), value, timeoutMs);
  }

  async expectLoginFieldEnabled(timeoutMs = 30_000): Promise<void> {
    await expectEnabled(webLocator(this.page, HomePage.L.loginField), timeoutMs);
  }

  async expectLoginFieldDisabled(timeoutMs = 30_000): Promise<void> {
    await expectDisabled(webLocator(this.page, HomePage.L.loginField), timeoutMs);
  }

  async expectLoginFieldChecked(timeoutMs = 30_000): Promise<void> {
    await expectChecked(webLocator(this.page, HomePage.L.loginField), timeoutMs);
  }

  async expectLoginFieldUnchecked(timeoutMs = 30_000): Promise<void> {
    await expectUnchecked(webLocator(this.page, HomePage.L.loginField), timeoutMs);
  }

  async expectLoginFieldFocused(timeoutMs = 30_000): Promise<void> {
    await expectFocused(webLocator(this.page, HomePage.L.loginField), timeoutMs);
  }

  async expectLoginFieldCount(count: number, timeoutMs = 30_000): Promise<void> {
    await expectCount(webLocator(this.page, HomePage.L.loginField), count, timeoutMs);
  }

  async scrollLoginFieldIntoView(): Promise<void> {
    await scrollIntoViewWhenVisible(webLocator(this.page, HomePage.L.loginField));
  }

}
